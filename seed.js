require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('./models/experience');

const sampleData = [
    {
        companyId: 1,
        companyName: 'Ominext',
        projects: [
            {
                projectId: 101,
                title: 'Hệ thống quán lý nhân sự',
                role: 'Frontend Developer',
                period: '2025',
                techStack: ['ReactJS'],
                description: ['Hệ thống quản lý nhân sự cho nội bộ công ty, hỗ trợ quản lý thông tin nhân viên, dự án, tính lương, phân quyền và xuất báo cáo.']
            },
            {
                projectId: 102,
                title: 'Hệ thống quản lý giấy chuyển viện',
                role: 'Backend Developer',
                period: '2025',
                techStack: ['ASP.NET'],
                description: ['Phần mềm quản lý giấy chuyển viện, in thông tin bệnh nhân (tên, mã số,...) phục vụ quản lý nhập viện và điều trị.']
            },
            {
                projectId: 103,
                title: 'Hệ thống in vòng tay cho bệnh nhân',
                role: 'Backend Developer',
                period: '2025',
                techStack: ['ASP.NET'],
                description: ['Phần mềm kết nối hệ thống quản lý bệnh viện với máy in vòng tay, in thông tin bệnh nhân (mã số, tên, địa chỉ, mã QR) phục vụ quản lý nhập viện và điều trị.']
            }
        ]
    },
    {
        companyId: 2,
        companyName: 'Haposoft',
        projects: [
            {
                projectId: 201,
                title: 'Hệ thống chấm công và quản lý nhân sự',
                role: 'Fullstack Developer',
                period: '2025',
                techStack: ['Nextjs, Laravel'],
                description: ['Hệ thống quản lý chấm công, thông báo và đăng ký ot dành cho toàn bộ nhân sự']
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Experience.deleteMany({});
        console.log("Cleared old data");

        await Experience.insertMany(sampleData);
        console.log("Added new data");
        
        process.exit();
    }
    catch (error) {
        console.error("seed db loi", error);
        process.exit(1);
    }
};

seedDB();
