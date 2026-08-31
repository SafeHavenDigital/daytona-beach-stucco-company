/**
 * POST /api/contact — contact-form handler.
 *
 * This is the ONLY place the Resend API key is touched. The key is read from
 * the server environment at request time and never reaches the client: the
 * browser posts JSON here and gets back nothing but a status and a message.
 *
 * KEY SOURCE — this site deploys to Cloudflare Workers. The current adapter
 * no longer populates `Astro.locals.runtime`, so the binding is read from the
 * `cloudflare:workers` module's `env` object, which is the runtime API for
 * reaching secrets and bindings. `readApiKey` below checks that first and
 * falls back to import.meta.env / process.env so `astro dev` works from a
 * local .env file. See .env.example for where to put the key.
 *
 * DESTINATION — `email` in src/config/site.ts (verified 2026-08-28). The
 * destination is not hardcoded here so the config file stays the single
 * source of truth for verified business facts.
 */
import type { APIRoute } from 'astro';
import { env as workerEnv } from 'cloudflare:workers';
import { Resend } from 'resend';
import { email as DESTINATION } from '../../config/site';

// This route runs on demand. Every other page in the site stays prerendered.
export const prerender = false;

/**
 * Sender on the verified Resend domain (daytonabeachstuccocompany.com).
 * The domain must stay verified in Resend or sends will fail. The visitor's
 * own address goes in Reply-To, never in From — spoofing the From address is
 * what gets a sending domain flagged.
 */
const FROM = 'Daytona Beach Stucco Company <leads@daytonabeachstuccocompany.com>';

/** Field length caps, applied server-side. Generous, but bounded. */
const LIMITS = {
  name: 200,
  email: 320, // RFC 5321 maximum
  phone: 50,
  location: 200,
  situation: 120,
  message: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

/**
 * Deliberately permissive: the job is to reject obvious junk, not to
 * adjudicate exotic-but-valid addresses and lose a real lead.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reads the Resend key from whichever environment this is running in. */
function readApiKey(): string | undefined {
  // Cloudflare Workers (production): secrets and bindings live on the `env`
  // object exported by `cloudflare:workers`. This is the only source that
  // matters on the deployed Worker.
  // `wrangler types` declares RESEND_API_KEY on Env from wrangler.jsonc, so
  // this is typed. It is still checked at runtime: on a Worker deployed
  // without the secret set, the binding is simply absent.
  const fromWorker: unknown = workerEnv?.RESEND_API_KEY;
  if (typeof fromWorker === 'string' && fromWorker) return fromWorker;

  // Local `astro dev`: Astro loads .env into import.meta.env. Server-only, so
  // this value is never inlined into a client bundle.
  const fromImportMeta = (import.meta.env as Record<string, unknown>)
    .RESEND_API_KEY;
  if (typeof fromImportMeta === 'string' && fromImportMeta) {
    return fromImportMeta;
  }

  // A plain Node host, where the key comes from the process environment.
  // Referenced via globalThis so this file needs no Node type definitions —
  // the project targets the Workers runtime, where `process` may not exist.
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process;
  const fromProcess = proc?.env?.RESEND_API_KEY;
  return fromProcess || undefined;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Collapses whitespace and trims. Returns '' for anything non-string. */
function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Escapes text for safe interpolation into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips CR/LF so a submitted value can never inject extra headers into the
 * Reply-To or Subject line.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export const POST: APIRoute = async ({ request }) => {
  // ---- Parse ------------------------------------------------------------
  let payload: Record<string, unknown>;
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      // Covers a non-JS fallback submit (urlencoded / multipart).
      payload = Object.fromEntries(await request.formData());
    }
  } catch {
    return json({ ok: false, error: 'We could not read that submission.' }, 400);
  }

  // Honeypot: a hidden field real people never fill in. Bots do. Answer 200
  // so the bot sees success and does not retry, but send nothing.
  if (clean(payload.contact_trap_7f3a)) {
    return json({ ok: true }, 200);
  }

  // ---- Validate ---------------------------------------------------------
  const fields = {} as Record<FieldName, string>;
  for (const key of Object.keys(LIMITS) as FieldName[]) {
    fields[key] = clean(payload[key]);
  }

  const errors: Record<string, string> = {};

  if (!fields.name) {
    errors.name = 'Please tell us your name.';
  }

  if (!fields.email) {
    errors.email = 'Please give us an email address so we can reply.';
  } else if (!EMAIL_RE.test(fields.email)) {
    errors.email = 'That email address does not look right.';
  }

  if (!fields.message && !fields.situation) {
    errors.message = 'Please tell us a little about what you are seeing.';
  }

  for (const key of Object.keys(LIMITS) as FieldName[]) {
    if (fields[key].length > LIMITS[key]) {
      errors[key] = 'That entry is longer than we can accept.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return json(
      { ok: false, error: 'Please check the highlighted fields.', errors },
      400,
    );
  }

  // ---- Configuration checks --------------------------------------------
  // These are server misconfigurations, not visitor errors. Log the specific
  // cause for the operator; tell the visitor only that sending failed and
  // give them the fallback address.
  const apiKey = readApiKey();
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set in this environment.');
    return json(
      {
        ok: false,
        error:
          'The form is not able to send right now. Please email us directly and we will pick it up.',
      },
      500,
    );
  }

  if (!DESTINATION) {
    console.error('[contact] No destination address configured in src/config/site.ts.');
    return json(
      { ok: false, error: 'The form is not able to send right now.' },
      500,
    );
  }

  // ---- Compose ----------------------------------------------------------
  // Every submitted field is included, with unfilled optional fields marked
  // rather than dropped, so the reader can tell "not asked" from "left blank".
  const rows: { label: string; value: string }[] = [
    { label: 'Name', value: fields.name },
    { label: 'Email', value: fields.email },
    { label: 'Phone', value: fields.phone || 'Not provided' },
    { label: 'Property location', value: fields.location || 'Not provided' },
    { label: 'Situation', value: fields.situation || 'Not selected' },
  ];

  const details = fields.message || 'No additional details provided.';

  const textBody = [
    'New contact form submission from daytonabeachstuccocompany.com',
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
    '',
    'Details:',
    details,
    '',
    `Reply directly to this email to reach ${fields.name}.`,
  ].join('\n');

  const htmlBody = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1c1a;">
    <div style="max-width:36rem;margin:0 auto;background:#ffffff;border:1px solid #e3e3df;border-radius:8px;padding:24px;">
      <h1 style="margin:0 0 4px;font-size:1.05rem;">New contact form submission</h1>
      <p style="margin:0 0 20px;font-size:0.85rem;color:#6a6a63;">daytonabeachstuccocompany.com</p>
      <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
        ${rows
          .map(
            (r) => `<tr>
          <td style="padding:6px 12px 6px 0;color:#6a6a63;white-space:nowrap;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:6px 0;vertical-align:top;">${escapeHtml(r.value)}</td>
        </tr>`,
          )
          .join('\n        ')}
      </table>
      <h2 style="margin:24px 0 6px;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:#6a6a63;">Details</h2>
      <p style="margin:0;white-space:pre-wrap;line-height:1.55;">${escapeHtml(details)}</p>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e3e3df;font-size:0.85rem;color:#6a6a63;">
        Reply directly to this email to reach ${escapeHtml(fields.name)}.
      </p>
    </div>
  </body>
</html>`;

  // ---- Send -------------------------------------------------------------
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [DESTINATION],
      // Reply-To is the lead's address, so hitting reply reaches the customer.
      replyTo: fields.email,
      subject: `New stucco inquiry — ${singleLine(fields.name)}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('[contact] Resend rejected the send:', error);
      return json(
        {
          ok: false,
          error:
            'We could not send that just now. Please email us directly and we will pick it up.',
        },
        502,
      );
    }

    // Resend reports success by returning a send id. No id means the send was
    // not accepted, whatever the absence of `error` suggests — do not tell the
    // visitor their message went through.
    if (!data?.id) {
      console.error('[contact] Resend returned no send id:', data);
      return json(
        {
          ok: false,
          error:
            'We could not send that just now. Please email us directly and we will pick it up.',
        },
        502,
      );
    }

    console.log('[contact] Sent submission', data.id);
    return json({ ok: true }, 200);
  } catch (cause) {
    console.error('[contact] Unexpected failure sending submission:', cause);
    return json(
      {
        ok: false,
        error:
          'Something went wrong on our end. Please email us directly and we will pick it up.',
      },
      500,
    );
  }
};

/** Anything but POST gets a clear 405 rather than a confusing 404. */
export const ALL: APIRoute = () =>
  json({ ok: false, error: 'Method not allowed.' }, 405);
