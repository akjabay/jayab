const nodemailer = require("nodemailer");
const config = require('../config.js');

let transporter = {};

async function main() {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        name: 'jayab.online',
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: config.mail,
            pass: config.emailPass
        }
    });
}

main();

const sendMail = async function (args = []) {
    const { email, subject, text } = args;
    const mailOptions = {
        from: config.mail,
        to: email,
        subject,
        text,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return {
            success: true,
            info
        }
    } catch (error) {
        const err = new Error(error);
        return {
            success: false,
            err
        }
    }

}

module.exports = {
    transporter,
    sendMail,
}