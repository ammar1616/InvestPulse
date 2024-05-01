const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    available: {
        type: Number,
        default: 100
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    price: {
        type: Number,
        required: true
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            percentage: {
                type: Number,
                default: 0
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
    collection: 'projects'
});

module.exports = projectSchema;