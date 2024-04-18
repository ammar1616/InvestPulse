const mongoose = require('mongoose');

const projectSchema = require('../schemas/project');

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;