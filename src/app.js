const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { connect } = require('./configurations/database');
const app = express();
app.use(bodyParser.json());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to InvestPulse!' });
});

connect().then(() => {
    app.listen(process.env.PORT, async () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});