const nodemailer = require('nodemailer');
const mailerConfig = require('../config/mailer');

const transporter = nodemailer.createTransport({
    host: mailerConfig.host,
    port: mailerConfig.port,
    auth: {
        user: mailerConfig.user,
        pass: mailerConfig.pass,
    },
});

const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: mailerConfig.from,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = {
    sendEmail,
};