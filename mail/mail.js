import nodemailer from "nodemailer"

async function formSendMail(name, email, subject, message) {
    let response
    if (name && email && subject && message != undefined) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "alexandreolitec@gmail.com",
                pass: "xcnxojloesnqmtrb",
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
        console.log("Message sent: %s", info.messageId, '\n', "Mensagem enviada com sucesso!");
    }
}

formSendMail().catch(console.error);

export default formSendMail