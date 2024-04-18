const mongoose = require('mongoose');

exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to the database!");
    }).catch(error => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });
};