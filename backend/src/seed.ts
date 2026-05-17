import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRequest from './models/JobRequest';
import User from './models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const users = [
    {
        name: "Amal Perera",
        email: "Amal@gmail.com",
        password: "1234",
    },
    {
        name: "Kasuni Fernando",
        email: "kasuni.f@gmail.com",
        password: "1234",
    },
    {
        name: "Ravindu Silva",
        email: "ravindu.silva@gmail.com",
        password: "1234",
    },
    {
        name: "Tharushi Jayasinghe",
        email: "tharushi.j@gmail.com",
        password: "1234",
    },
    {
        name: "Sahan Wijeratne",
        email: "sahanw@gmail.com",
        password: "1234",
    },
];

const sampleJobs = [

    {
        "title": "Leaking kitchen tap repair needed",
        "description": "Kitchen tap has been leaking since yesterday. Need a plumber urgently.",
        "category": "Plumbing",
        "location": "Colombo",
        "contactName": "Amal Perera",
        "contactEmail": "Amal@gmail.com",
        "status": "Open"
    },
    {
        "title": "Need house painting service",
        "description": "Looking for a painter to repaint 2 bedrooms and the living room.",
        "category": "Painting",
        "location": "Kandy",
        "contactName": "Kasuni Fernando",
        "contactEmail": "kasuni.f@gmail.com",
        "status": "Open"
    },
    {
        "title": "Electrical wiring issue in bedroom",
        "description": "Power sockets are not working properly in one room. Need an electrician.",
        "category": "Electrical",
        "location": "Galle",
        "contactName": "Ravindu Silva",
        "contactEmail": "ravindu.silva@gmail.com",
        "status": "In Progress"
    },
    {
        "title": "Need carpenter for cupboard repair",
        "description": "Wooden cupboard door is broken and needs repair urgently.",
        "category": "Joinery",
        "location": "Kurunegala",
        "contactName": "Tharushi Jayasinghe",
        "contactEmail": "tharushi.j@gmail.com",
        "status": "Open"
    },
    {
        "title": "Bathroom pipe blockage",
        "description": "Bathroom water drainage pipe is blocked. Need plumbing service.",
        "category": "Plumbing",
        "location": "Negombo",
        "contactName": "Sahan Wijeratne",
        "contactEmail": "sahanw@gmail.com",
        "status": "Closed"
    },
    {
        "title": "Need wall painting for shop",
        "description": "Small grocery shop needs exterior wall painting before opening.",
        "category": "Painting",
        "location": "Matara",
        "contactName": "Dinesh Kumara",
        "contactEmail": "dinesh.k@gmail.com",
        "status": "Open"
    },
    {
        "title": "Install ceiling fans",
        "description": "Need an electrician to install 3 ceiling fans in a new house.",
        "category": "Electrical",
        "location": "Anuradhapura",
        "contactName": "Ishara Madushani",
        "contactEmail": "ishara.m@gmail.com",
        "status": "In Progress"
    },
    {
        "title": "Need wooden gate repair",
        "description": "Front wooden gate is damaged and needs fixing.",
        "category": "Joinery",
        "location": "Jaffna",
        "contactName": "Kavindu Ramanathan",
        "contactEmail": "kavindu.r@gmail.com",
        "status": "Open"
    }

];

const seedDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        await mongoose.connect(mongoURI);
        console.log('Connected to Database for Seeding...');

        // user seed
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await User.updateOne(
                { email: user.email },
                {
                    $setOnInsert: {
                        name: user.name,
                        email: user.email,
                        password: hashedPassword,
                    },
                },
                { upsert: true }
            );
        }

        console.log("Users seeded safely");

        //job seed
        await JobRequest.deleteMany();


        await JobRequest.insertMany(sampleJobs);
        console.log('Inserted sample jobs successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();