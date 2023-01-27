const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.routes');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
// const prisma = require('./db/prisma');

const prisma = new PrismaClient();
dotenv.config();
const port = 4000;
const app = express();

// app.get('/', (req, res) => {
//     // res.send('Working...')
//     prisma.users.findMany();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/createUser', userRoute);
app.use('/getUsers', userRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});