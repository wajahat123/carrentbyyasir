const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
    const { email, username, subject, message } = req.body;
    console.log(req.body)
    if (!email || !username || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yasirkh261@gmail.com",
            pass: "nukm onbn qelz yuvl",
        },
    });

    let mailOptions = {
        from: email,
        to: "yasirkh261@gmail.com", // Your Email (Jis par message receive karna hai)
        subject: subject,
        text: `Name: ${username}\nEmail: ${email}\n\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error sending message" });
    }
};
