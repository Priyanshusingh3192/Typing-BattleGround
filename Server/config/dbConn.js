const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
        console.log("Connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB