const express = require('express');
const router = express.Router();
const users = require('../model/User');

const validator = require("email-validator");
const { passwordStrength } = require('check-password-strength');
const sendEmail = require('./emailController');
const bcrypt = require('bcryptjs');
const otp = require("../model/otpSchema");

const handleOtp = async (req, res) => {
    // console.log("Request Body:", req.body);
    const { name, email, pwd, username } = req.body;

    if (!validator.validate(email)) {
        return res.status(400).json({ message: "Invalid Email Address" });
    }

    if (passwordStrength(pwd).value !== 'Strong' && passwordStrength(pwd).value !== 'Medium') {
        return res.status(400).json({ message: "Password is too weak. Use a stronger password." });
    }

    try {
        const existingUser = await users.findOne({ email });
        const existingUsername = await users.findOne({ username });

        if (existingUser || existingUsername) {
            return res.status(409).json({ message: "User with this email or username already exists" });
        }

        console.log("OTP generation section");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);
        const otpValue = Math.floor(100000 + Math.random() * 900000);
        const currentTime = new Date();

        const existingOtp = await otp.findOne({ email });

        if (existingOtp) {
            // Update existing OTP entry
            await otp.updateOne(
                { email },
                {
                    $set: {
                        otp: otpValue,
                        time: currentTime,
                        name,
                        pwd: hashedPassword,
                        username,
                    },
                }
            );

            await sendEmail("OTP", otpValue, email, "no-reply@yourapp.com", email);
            console.log("status 201");
            return res.status(201).json({ message: "OTP updated and sent successfully" });
        }
        // Create a new OTP entry
        const newOtp = new otp({
            otp: otpValue,
            email,
            time: currentTime,
            name,
            pwd: hashedPassword,
            username,
        });

        await newOtp.save();
        await sendEmail("OTP", otpValue, email, "no-reply@yourapp.com", email);
        return res.status(202).json({ message: "OTP created and sent successfully" });
    } catch (error) {
        console.error("Error in OTP handling:", error);
        return res.status(500).json({ message: "An internal server error occurred" });
    }
};

module.exports = handleOtp;
