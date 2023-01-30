const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.routes');
// const prisma = require('./db/prisma');

const app = express();
dotenv.config();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// *** routes ***
app.use('/', userRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});