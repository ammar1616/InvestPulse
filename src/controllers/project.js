const projectService = require('../services/project')

exports.add = async (req, res) => {
    try {
        const { title, description } = req.body;
        const data = { title, description, author: req.user._id };
        data.image = req.file.path.replace(/\\/g, '/');
        console.log(req.file.originalname);
        const project = await projectService.create(data);
        if (!project) {
            return res.status(400).json({ error: 'Project creation failed' });
        }
        res.status(200).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getByUser = async (req, res) => {
    try {
        const projects = await projectService.getByUser(req.params.userId);
        if (!projects) {
            return res.status(400).json({ error: 'No projects found' });
        }
        res.status(200).json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.search = async (req, res) => {
    try {
        const identifier = req.query.q;
        const projects = await projectService.searchProjects(identifier);
        if (!projects) {
            return res.status(400).json({ error: 'No projects found' });
        }
        res.status(200).json({ message: 'Project retrieved successfully', projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const projects = await projectService.getAll();
        if (!projects) {
            return res.status(400).json({ error: 'No projects found' });
        }
        res.status(200).json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.like = async (req, res) => {
    try {
        const { projectId, percentage } = req.body;
        const data = { projectId, percentage, user: req.user._id };
        const project = await projectService.likeProject(data);
        if (!project) {
            return res.status(400).json({ error: 'Project like failed' });
        }
        res.status(200).json({ message: 'Project liked successfully', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.comment = async (req, res) => {
    try {
        const { projectId, comment } = req.body;
        const data = { projectId, comment, user: req.user._id };
        const project = await projectService.commentProject(data);
        if (!project) {
            return res.status(400).json({ error: 'Project comment failed' });
        }
        res.status(200).json({ message: 'Project commented successfully', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOne = async (req, res) => {
    try {
        const project = await projectService.searchProjects(req.params.id);
        if (!project) {
            return res.status(400).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project fetched successfully', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const data = { projectId: req.params.id, user: req.user._id };
        const project = await projectService.delete(data);
        if (!project) {
            return res.status(400).json({ error: 'Project deletion failed' });
        }
        res.status(200).json({ message: 'Project deleted successfully', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

