export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, telefono, asunto, mensaje } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'madape05@gmail.com',
        subject: `Nuevo mensaje de portafolio de: ${nombre} - ${asunto}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Nuevo Mensaje de Contacto</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f7; padding: 40px 0;">
                  <tr>
                      <td align="center">
                          <!-- Contenedor Principal -->
                          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                              <!-- Header -->
                              <tr>
                                  <td style="background-color: #0f172a; padding: 30px; text-align: center;">
                                      <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Nuevo Mensaje Recibido</h1>
                                  </td>
                              </tr>
                              <!-- Contenido -->
                              <tr>
                                  <td style="padding: 30px;">
                                      <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px;">Has recibido un nuevo mensaje a través del formulario de tu portafolio:</p>
                                      
                                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 20px;">
                                          <tr>
                                              <td style="padding-bottom: 15px;">
                                                  <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Nombre</p>
                                                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #0f172a; font-weight: bold;">${nombre}</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="padding-bottom: 15px;">
                                                  <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Correo de contacto</p>
                                                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #0f172a; font-weight: bold;">${email}</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="padding-bottom: 15px;">
                                                  <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Teléfono</p>
                                                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #0f172a; font-weight: bold;">${telefono}</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td>
                                                  <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
                                                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #334155; line-height: 1.6; background: #f8fafc; padding: 15px; border-radius: 5px; border-left: 4px solid #38bdf8;">${mensaje}</p>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <!-- Footer / Botón -->
                              <tr>
                                  <td style="padding: 0 30px 30px 30px; text-align: center;">
                                      <a href="mailto:${email}" style="background-color: #38bdf8; color: #0f172a; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Responder mensaje</a>
                                  </td>
                              </tr>
                          </table>
                          <!-- Pie -->
                          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Este correo fue generado automáticamente desde tu portafolio.</p>
                      </td>
                  </tr>
              </table>
          </body>
          </html>
        `
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}