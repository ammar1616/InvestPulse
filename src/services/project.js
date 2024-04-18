const mongoose = require('mongoose')

const Project = require('../models/project')

const userService = require('./user')

exports.create = async (data) => {
    try {
        const { title, description, image, author } = data;
        const existingProject = await Project.findOne({ title });
        if (existingProject) {
            throw new Error('Project already exists');
        }
        const project = new Project({ title, description, image, author });
        return await project.save();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.getByUser = async (userId) => {
    try {
        const user = await userService.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return await Project.find({ author: user._id });
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.searchProjects = async (identifier) => {
    try {
        let projects;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            projects = await Project.findById(identifier);
        } else {
            projects = await Project.find({
                $or: [
                    { title: { $regex: identifier, $options: 'i' } }, // Case-insensitive search
                    { description: { $regex: identifier, $options: 'i' } } // Case-insensitive search
                ]
            });
        }
        return projects;
    } catch (error) {
        console.log(error);
        return;
    }
};


exports.getAll = async () => {
    try {
        return await Project.find({});
    } catch (error) {
        console.log(error);
        return;
    }
};


exports.likeProject = async (data) => {
    try {
        const user = await userService.getUser(data.user);
        if (!user) {
            throw new Error('User not found');
        }
        const project = await this.searchProjects(data.projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.author.toString() === user._id.toString()) {
            throw new Error('User cannot like their own project');
        }
        if (data.percentage < 0 || data.percentage > 100) {
            throw new Error('Invalid percentage');
        }
        if (data.percentage > project.available) {
            throw new Error("this percentage isn't available");
        }
        const existingLike = project.likes.find(like => like.user.toString() === user._id.toString());
        if (existingLike) {
            project.available += existingLike.percentage;
            project.likes = project.likes.filter(like => like.user.toString() !== user._id.toString());
        } else {
            project.available -= data.percentage;
            project.likes.push({ user: user._id, percentage: data.percentage });
        }
        await user.save();
        return await project.save();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.commentProject = async (data) => {
    try {
        const user = await userService.getUser(data.user);
        if (!user) {
            throw new Error('User not found');
        }
        const project = await this.searchProjects(data.projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        project.comments.push({ user: user._id, comment: data.comment });
        return await project.save();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.delete = async (data) => {
    try {
        const project = await this.searchProjects(data.projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userService.getUser(data.user);
        if (!user) {
            throw new Error('User not found');
        }
        if (project.author.toString() !== user._id.toString() && user.role !== 'admin') {
            throw new Error('User cannot delete this project');
        }
        return await Project.findByIdAndDelete(data.projectId);
    }
    catch (error) {
        console.log(error);
        return;
    }
};

