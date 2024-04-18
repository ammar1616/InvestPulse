const authenticationService = require('../services/auth');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authenticationService.login(email, password);
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }
        res.json({ message: 'Login successful', token: response.token, user: response.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, role, phone } = req.body;
        const data = {
            username,
            email,
            password,
            role,
            phone
        };
        const response = await authenticationService.register(data);
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}