import nodemailer from "nodemailer"

async function formSendMail(name, email, subject, message) {
    if (name && email && subject && message != undefined) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "alexandreolitec@gmail.com", // generated ethereal user
                pass: "xcnxojloesnqmtrb", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: "AA Digital Design - Site", // sender address
            to: "alexandreoliveiradvp@gmail.com", // list of receivers
            subject: "Mensagem do formulário de AA Digital Design - Site", // Subject line
            text: "Mensagem de AA Digital Design - Site", // plain text body
            html:  `<p>Nome: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Assunto: ${subject}</p>
                    <p>Mensagem: ${message}</p>`
        });
        console.log("Message sent: %s", info.messageId, '\n', "Mensagem eviada com sucesso!");
    }
}

formSendMail().catch(console.error);

export default formSendMail