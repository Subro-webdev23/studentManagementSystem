
const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

