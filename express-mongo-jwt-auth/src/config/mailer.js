const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD,
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.ETHEREAL_EMAIL,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};