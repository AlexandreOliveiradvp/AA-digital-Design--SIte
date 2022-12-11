import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'

dotenv.config()

async function formSendMail(name, email, subject, message) {
    if (name && email && subject && message != undefined) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USRAPP_GMAIL,
                pass: process.env.PSWAPP_GMAIL,
            },
        });

        let info = await transporter.sendMail({
            from: "AA Digital Design - Site",
            to: "alexandreoliveiradvp@gmail.com",
            subject: "Mensagem do formulário de AA Digital Design - Site",
            text: "Mensagem de AA Digital Design - Site",
            html:  `<p>Nome: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Assunto: ${subject}</p>
                    <p>Mensagem: ${message}</p>`
        });
        await console.log("Message sent: %s", info.messageId, '\n', "Mensagem enviada com sucesso!");
    }
}

formSendMail().catch(console.error);

export default formSendMail