const { getText } = require("../../../Constants")

const nodemailer = require("nodemailer");
const mailer = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password
    }
});

const send = (email, mail, cb) => {
    mailer.sendMail({
        from: `"${getText("SITE_TRADE_MARK")}" <${process.env.MAILER_USER}>`, // sender address
        to: `${email.trim().toLowerCase()}`, // list of receivers separated with commas
        subject: mail.mailSubject, // Subject line
        html: mail.mailMsg, // html body
    })
    .then(info => {
        cb(null, info)

    })
    .catch(e => {
        cb(e, null)
    })
}



module.exports = {mailer: mailer, send: send}