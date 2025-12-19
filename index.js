require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const apiKey = re_Yh5zV4HM_3i1AnLC4adMzjXG8RGvN9hZh;
const resend = new Resend(apiKey);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            succes: false,
            message: "Fields are not allowed to be empty"
        });
    }

    try {
        const data = await resend.emails.send({
            from: 'hoangbaophuc@hoangbaophuc.store', 
            to: [process.env.EMAIL_USER], 
            reply_to: email, 
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
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return res.status(500).json({
                success: false,
                message: data.error
            });
        }

        console.log(`Email sent successfully from: ${email}`);
        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
