const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

require('dotenv').config();

exports.create = async (data) => {
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const { username, email, role, phone } = data;
        const user = new User({ username, email, password: hashedPassword, role, phone });
        return await user.save();
    } catch (error) {
        console.log(error);
        return;
    }
}

exports.getUser = async (identifier) => {
    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            user = await User.findById(identifier);
        } else {
            user = await User.findOne({
                $or: [
                    { username: identifier },
                    { email: identifier }
                ]
            });
        }
        return user;
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.getUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        console.log(error);
        return;
    }
}