require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Connection error", error);
    }
    else {
        console.log("Connection success");
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            succes: false,
            message: "Fiels are not allowed to be empty"
        });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `Let's work together: ${name}`,
        html: `
            <h3>Bạn có tin nhắn mới từ người lạ</h3>
            <p><strong>Tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nội dung:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #8594e4;">
                ${message}
            </blockquote>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`You have a mail from ${email}`);
        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    }
    catch (error) {
        console.error("Email sent unsuccessfully", error);
        res.status(500).json({
            success: false,
            message: "Error, cannot send"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
