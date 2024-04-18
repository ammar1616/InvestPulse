const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    phone: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    likes: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project'
            },
            percentage: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = userSchema;