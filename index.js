require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Resend } = require('resend');
const cors = require('cors');
const Experience = require('./models/experience');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connect failed", error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
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

app.get('/api/experience', async (req, res) => {
    try {
        const data = await Experience.find().sort({ companyId: 1 });
        res.json(data);
    }
    catch (error) {
        console.error("database error", error);
        res.status(500).json({
            message: error.message
        });
    }
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
