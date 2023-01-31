const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userController = require('./controllers/user.controllers');
// const userRoute = require('./routes/user.routes');
// const userRoute = require('./routes/v1');
// const prisma = require('./db/prisma');

const app = express();
dotenv.config();
const port = 4000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
// app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// }); 
app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const v1Router = express.Router();
app.use('/v1', v1Router);

// *** routes ***
v1Router.post('/', userController.createUser);
// v1Router.use('/users', userRoute);
// v1Router.post('/login', userController.userLogin);
// app.use('/login', userRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});