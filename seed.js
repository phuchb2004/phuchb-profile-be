require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('./models/experience');
const Certificate = require('./models/certificate');

const sampleDataExp = [
    {
        companyId: 1,
        companyName: 'Ominext',
        projects: [
            {
                projectId: 101,
                title: { 
                    vi: 'Hệ thống quản lý nhân sự', 
                    en: 'HR Management System' 
                },
                role: { 
                    vi: 'Frontend Developer', 
                    en: 'Frontend Developer' 
                },
                period: '2025',
                techStack: ['ReactJS'],
                description: {
                    vi: [
                        'Hệ thống quản lý nhân sự cho nội bộ công ty, hỗ trợ quản lý thông tin nhân viên, dự án, tính lương, phân quyền và xuất báo cáo.'
                    ],
                    en: [
                        'Internal HR management system, supporting employee information management, projects, payroll, role-based access control, and reporting.'
                    ]
                }
            },
            {
                projectId: 102,
                title: { 
                    vi: 'Hệ thống quản lý giấy chuyển viện', 
                    en: 'Hospital Transfer Management System' 
                },
                role: { 
                    vi: 'Backend Developer', 
                    en: 'Backend Developer' 
                },
                period: '2025',
                techStack: ['ASP.NET'],
                description: {
                    vi: [
                        'Phần mềm quản lý giấy chuyển viện, in thông tin bệnh nhân (tên, mã số,...) phục vụ quản lý nhập viện và điều trị.'
                    ],
                    en: [
                        'Software for managing hospital transfer papers, printing patient information (name, ID, etc.) for admission and treatment management.'
                    ]
                }
            },
            {
                projectId: 103,
                title: { 
                    vi: 'Hệ thống in vòng tay cho bệnh nhân', 
                    en: 'Wristband Printing System'
                },
                role: { 
                    vi: 'Backend Developer', 
                    en: 'Backend Developer' 
                },
                period: '2025',
                techStack: ['ASP.NET'],
                description: {
                    vi: [
                        'Phần mềm kết nối hệ thống quản lý bệnh viện với máy in vòng tay, in thông tin bệnh nhân (mã số, tên, địa chỉ, mã QR) phục vụ quản lý nhập viện và điều trị.'
                    ],
                    en: [
                        'Software connecting the hospital management system with wristband printers, printing patient info (ID, name, address, QR code) for admission.'
                    ]
                }
            }
        ]
    },
    {
        companyId: 2,
        companyName: 'Haposoft',
        projects: [
            {
                projectId: 201,
                title: { 
                    vi: 'Hệ thống chấm công và quản lý nhân sự', 
                    en: 'Timekeeping and HR System' 
                },
                role: { 
                    vi: 'Fullstack Developer', 
                    en: 'Fullstack Developer' 
                },
                period: '2025',
                techStack: ['Nextjs, Laravel'],
                description: {
                    vi: [
                        'Hệ thống quản lý chấm công, thông báo và đăng ký OT dành cho toàn bộ nhân sự'
                    ],
                    en: [
                        'System for managing timekeeping, notifications, and Overtime (OT) registration for all personnel.'
                    ]
                }
            }
        ]
    }
];

const sampleDateCertificate = [
    {
        certificateId: 1,
        title: {
            "vi": "Khóa học SQL",
            "en": "SQL Course"
        },
        description: "Codecademy - 6/2024"
    },
    {
        certificateId: 2,
        title: {
            "vi": "Khóa học C++",
            "en": "C++ Course"
        },
        description: "Codecademy - 7/2024"
    },
    {
        certificateId: 3,
        title: {
            "vi": "Khóa học Java",
            "en": "Java Course"
        },
        description: "Codecademy - 8/2024"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Experience.deleteMany({});
        await Certificate.deleteMany({});
        console.log("Cleared old data");

        await Experience.insertMany(sampleDataExp);
        await Certificate.insertMany(sampleDateCertificate);
        console.log("Added new data");
        
        process.exit();
    }
    catch (error) {
        console.error("seed db loi", error);
        process.exit(1);
    }
};

seedDB();
