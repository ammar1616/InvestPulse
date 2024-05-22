const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const axios = require('axios');
require('dotenv').config();

const { connect } = require('./configurations/database');
const app = express();
app.use(bodyParser.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());
app.use(cors());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');

app.use('/public', express.static('public'));
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