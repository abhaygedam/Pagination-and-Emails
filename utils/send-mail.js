const transporter = require("../config/mail");


module.exports = async ({to, subject, text, html}) => {
    await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });
}