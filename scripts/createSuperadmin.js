import bcrypt from "bcryptjs";
import Superadmin from '../src/models/Superadmin.js';
import dotenv from "dotenv";
import connectDB from "../src/lib/dbConnect.js";
import mongoose from "mongoose";

dotenv.config({path: './.env.local'});

const createSuperadmin = async () => {
    await connectDB();
    const existingSuperadmin = await Superadmin.findOne({ email: 'superadmin@mediease.com' });
    if (existingSuperadmin) {
        console.log('Superadmin already exists');
        return;
    }

    const superadmin = new Superadmin({
        email: 'superadmin@mediease.com',
        password: 'superadmin123',
    });

    await superadmin.save();
    console.log('Superadmin created successfully');
    process.exit(0);
};


createSuperadmin().catch(err => {
    console.error('Error creating superadmin:', err);
    process.exit(1);
});


