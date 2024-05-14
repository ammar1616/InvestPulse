const projectService = require('../services/project')

exports.add = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const data = { title, description, price, author: req.user._id };
        if (req.files && req.files.image) {
            data.image = req.files.image[0].path.replace(/\\/g, '/');
        }
        if (req.files && req.files.video) {
            data.video = req.files.video[0].path.replace(/\\/g, '/');
        }
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

exports.status = async (req, res) => {
    try {
        const { status } = req.params;
        console.log(status);
        const projects = await projectService.status(status);
        if (!projects) {
            return res.status(400).json({ error: 'No projects found' });
        }
        res.status(200).json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}