const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userController = require("./controllers/user.controllers");
const integrationController = require("./controllers/integration.controllers");
// require("dotenv").config();
// const session = require("express-session");
// const prisma = require("./lib/prisma");
// const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();
// const port = 4000;
const port = process.env.PORT || 4000;

// const secret = process.env.SESSION_SECRET;
// const store = new session.MemoryStore();
// const protect = (req, res, next) => {
//   const { authenticated } = req.session;

//   if (!authenticated) {
//     res.sendStatus(401);
//   } else {
//     next();
//   }
// };
// app.use(
//   session({
//     secret,
//     resave: false,
//     saveUninitialized: false,
//     store,
//   })
// );

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const v1Router = express.Router();
app.use("/v1", v1Router);

// *** user routes ***
v1Router.post("/", userController.createUser);
v1Router.post("/login", userController.userLogin);
v1Router.post("/verifyToken", userController.verifyToken);
v1Router.post("/getUser", userController.getUser);
v1Router.post("/updateUser", userController.updateUser);

// *** integration routes ***
v1Router.post("/addIntegration", integrationController.createIntegration);
v1Router.post("/getIntegrations", integrationController.getIntegrations);
v1Router.post("/getIntegrationById", integrationController.getIntegrationById);

// app.get("/v1/login", (req, res) => {
//   const { authenticated } = req.session;

//   console.log('rr',req.session.user);
//   if (authenticated) {
//     // req.session.authenticated = true;
//     res.send("Already authenticated");

//   } else {
//     res.send("Successfully authenticated");

//   }
// });
app.get("/v1/test", (req, res) => {
//     console.log('rr',req.session.user);
//   req.session.destroy(() => {
    res.send("Successfully logged out");
//   });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
