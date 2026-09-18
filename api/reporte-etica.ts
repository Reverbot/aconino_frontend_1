declare const process: { env: Record<string, string | undefined> };

const MAX_TOTAL_FILE_SIZE = 4 * 1024 * 1024;
const MAX_FILE_COUNT = 8;
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_RECIPIENT = 'transparenciayetica@aconino.org';
const DEFAULT_SENDER = 'Canal de Transparencia y Ética <transparenciayetica@aconino.org>';

const allowedExtensions = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xls', 'xlsx', 'mp4', 'mp3', 'avi']);

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);

const getText = (formData: FormData, name: string, maxLength = 10000) => {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const toBase64 = (arrayBuffer: ArrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
};

const getExtension = (filename: string) => filename.split('.').pop()?.toLowerCase() ?? '';

const sanitizeFilename = (filename: string) => {
  const basename = filename.split(/[\\/]/).pop() || 'soporte';
  return basename.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 120) || 'soporte';
};

const fields = [
  ['Modalidad del reporte', 'modalidad_reporte'],
  ['Nombre de quien reporta', 'nombre_reportante'],
  ['Tipo de vinculación', 'vinculacion_reportante'],
  ['Correo de quien reporta', '_replyto'],
  ['Teléfono de quien reporta', 'telefono_reportante'],
  ['Tipo de situación', 'tipo_situacion'],
  ['Otra situación', 'otra_situacion'],
  ['Fecha del incidente', 'fecha_incidente'],
  ['Lugar, sede o área', 'lugar_area'],
  ['Fecha de inicio', 'fecha_inicio'],
  ['Fecha aproximada de finalización', 'fecha_fin'],
  ['Personas, cargos o áreas involucradas', 'personas_involucradas'],
  ['Descripción de los hechos', 'descripcion_hechos'],
  ['Posible impacto', 'posible_impacto'],
  ['Motivación del reporte', 'motivacion_reporte'],
  ['Información adicional', 'informacion_adicional'],
  ['Acepta autorización para tratamiento de datos', 'acepta_autorizacion-datos'],
  ['Acepta términos y condiciones del canal', 'acepta_terminos-canal'],
  ['Acepta política de tratamiento de datos', 'acepta_politica-datos'],
  ['Declara actuar de buena fe', 'declara_buena_fe'],
] as const;

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Método no permitido.' }, 405);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: 'El servicio de correo no está configurado.' }, 500);
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse({ error: 'No fue posible leer la información enviada.' }, 400);
    }

    if (getText(formData, '_honey')) {
      return jsonResponse({ ok: true });
    }

    const modality = getText(formData, 'modalidad_reporte');
    const situation = getText(formData, 'tipo_situacion');
    const otherSituation = getText(formData, 'otra_situacion');
    const incidentDate = getText(formData, 'fecha_incidente');
    const description = getText(formData, 'descripcion_hechos');
    const requiredFields = [
      modality,
      situation,
      incidentDate,
      description,
      getText(formData, 'acepta_autorizacion-datos'),
      getText(formData, 'acepta_terminos-canal'),
      getText(formData, 'acepta_politica-datos'),
      getText(formData, 'declara_buena_fe'),
    ];

    if (requiredFields.some((value) => !value) || (situation === 'Otro' && !otherSituation)) {
      return jsonResponse({ error: 'Completa los campos obligatorios y las autorizaciones.' }, 400);
    }

    const replyTo = getText(formData, '_replyto', 320);
    if (replyTo && !isValidEmail(replyTo)) {
      return jsonResponse({ error: 'El correo de contacto no tiene un formato válido.' }, 400);
    }

    const files = formData
      .getAll('archivos')
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (files.length > MAX_FILE_COUNT) {
      return jsonResponse({ error: `Puedes adjuntar hasta ${MAX_FILE_COUNT} archivos.` }, 400);
    }

    const totalFileSize = files.reduce((total, file) => total + file.size, 0);
    if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
      return jsonResponse({ error: 'Los archivos superan el máximo total permitido de 4 MB.' }, 413);
    }

    for (const file of files) {
      if (!allowedExtensions.has(getExtension(file.name))) {
        return jsonResponse({ error: `El archivo “${sanitizeFilename(file.name)}” no tiene un formato permitido.` }, 400);
      }
    }

    const reportFields = fields
      .map(([label, name]) => [label, getText(formData, name)] as const)
      .filter(([, value]) => value);
    const reportHtmlRows = reportFields
      .map(([label, value]) => `<tr><th style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top;color:#334155;width:34%;">${escapeHtml(label)}</th><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;color:#0f172a;">${escapeHtml(value)}</td></tr>`)
      .join('');
    const reportText = reportFields.map(([label, value]) => `${label}:\n${value}`).join('\n\n');
    const reportTitle = situation === 'Otro' ? otherSituation : situation;
    const subject = `Nuevo reporte ético — ${reportTitle}`.replace(/[\r\n]/g, ' ').slice(0, 180);

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: sanitizeFilename(file.name),
        content: toBase64(await file.arrayBuffer()),
        content_type: file.type || 'application/octet-stream',
      })),
    );

    let resendResponse: Response;
    try {
      resendResponse = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || DEFAULT_SENDER,
          to: [process.env.REPORT_RECIPIENT || DEFAULT_RECIPIENT],
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject,
          text: `Canal de Transparencia y Ética Aconiño\n\n${reportText}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:760px;color:#0f172a;"><h1 style="color:#0c2070;font-size:22px;">Nuevo reporte — Canal de Transparencia y Ética Aconiño</h1><p style="color:#475569;">Este mensaje fue enviado desde el formulario oficial de reporte.</p><table style="border-collapse:collapse;width:100%;font-size:14px;">${reportHtmlRows}</table>${files.length ? `<p style="margin-top:20px;color:#475569;"><strong>Adjuntos:</strong> ${files.map((file) => escapeHtml(sanitizeFilename(file.name))).join(', ')}</p>` : '<p style="margin-top:20px;color:#475569;"><strong>Adjuntos:</strong> No se adjuntaron archivos.</p>'}</div>`,
          attachments,
        }),
      });
    } catch {
      return jsonResponse({ error: 'No fue posible conectarse con el servicio de correo.' }, 502);
    }

    if (!resendResponse.ok) {
      return jsonResponse({ error: 'No fue posible enviar el reporte. Inténtalo nuevamente.' }, 502);
    }

    return jsonResponse({ ok: true });
  },
};
