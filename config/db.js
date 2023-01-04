require('dotenv').config();

const mongoose = require('mongoose');

const connectMongoServer = async() => {
    try {
        const mongoString = process.env.DATABASE_URL;
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoString);
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = connectMongoServer;