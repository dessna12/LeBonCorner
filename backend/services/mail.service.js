const nodemailer =require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  tls:{
    // tester notre système de mail en développement 
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
})


async function sendWelcomeEmail(to, name) {
  await transporter.sendMail({
    from: `"LeBonCorner" <${process.env.MAIL_USER}`,
    to, 
    subject: 'Bienvenue sur le BonCorner',
    text: `Bonjour ${name}, \n\n Votre compte a bien été créé. Merci de votre confiance`,
    html: `
      <h2>Bienvenue sur le BonCorner</h2>
      <p>Votre compte a bien été créé</p>
      <p>Merci de votre confiance</p>
    `
  })
}

async function sendResetPasswordMail(to, resetUrl) {
  await transporter.sendMail({
    from: `"LeBonCorner" <${process.env.MAIL_USER}`,
    to, 
    subject: 'Réinitialisez votre mot de passe',
    text: `Vous avez demandé à réinitiliser votre mot de passe sur le BonCorner. Voici votre lien de réinitialisation (valable 1h) : \n${resetUrl}.`,
    html: `
      <h2> Réinitialisation de votre mot de passe sur le BonCorner</h2>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Voici le lien de réinitialisation valable 1h</p>
      <a href="${resetUrl}">
        Réinitilisation de votre mot de passe
      </a>
    `
  })
}


module.exports = { sendWelcomeEmail, sendResetPasswordMail }