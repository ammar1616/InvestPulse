const userService = require('../services/user');

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        if (!users) {
            return res.status(404).json({ error: 'Users not found' });
        }
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
