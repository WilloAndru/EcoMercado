import nodemailer from 'nodemailer';

async function sendResetEmail(to, code) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"EcoMercado" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Recuperación de contraseña',
    html: `<p>Tu código de recuperación es: <strong>${code}</strong></p><p>Expira en 5 minutos.</p>`
  });

  console.log(`✅ Email enviado a ${to}`);
}

export default sendResetEmail;
