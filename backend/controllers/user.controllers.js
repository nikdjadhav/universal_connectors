// import prisma from "../lib/prisma";
// import response from "../lib/response";
const prisma = require("../lib/prisma");
const response = require("../lib/response");
const jwt = require("jsonwebtoken");

// *** to create a new user in the database ***
const createUser = async (req, res) => {
  // console.log('requestd body',req.body);
  try {
    const user = await prisma.users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      },
    });
    response({
      res,
      success: true,
      status: 200,
      data: [user],
      message: "User created successfully",
    });
  } catch (error) {
    response({
      res,
      success: false,
      status: 400,
      data: [],
      message: "User not created",
    });
  }
};

// *** to fetch all the users from the database ***
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    response({
      res,
      success: true,
      status: 200,
      data: users,
      message: "Users fetched successfully",
    });
    // res.json(users);
  } catch (error) {
    response({
      res,
      success: false,
      status: 400,
      data: [],
      message: "user not fetched",
    });
  }
};

// *** route to check if the user is logged in or not ***
// *** to fetch a single user from the database ***

// *** using jwt token ***
const userLogin = async (req, res) => {
  // console.log(req.body);
  const logedinUser = await prisma.users.findUnique({
    where: {
      loginUser: {
        email: req.body.email,
        password: req.body.password,
      },
    },
  });
  // console.log(logedinUser);
  if (logedinUser) {
    const token = jwt.sign(
      { email: req.body.email, password: req.body.password },
      process.env.ACCESS_TOKEN_SECRET
    );
    response({
      res,
      success: true,
      status: 200,
      data: [{
        success: true,
        firstName: logedinUser.firstName,
        lastName: logedinUser.lastName,
        email: logedinUser.email,
        verrified: true,
        token: token,
      }],
      message: "User logged in successfully",
    })
  } else {
    response({
      res,
      success: false,
      status: 400,
      data: [],
      message: "User not found",
    });
  }
}

// *** 
// const userLogin = async (req, res) => {
//   const user = await prisma.users.findUnique({
//     where: {
//       loginUser: {
//         email: req.body.email,
//         password: req.body.password,
//       },
//     },
//   });
//   // console.log(user);
//   if (user) {
//     response({
//       res,
//       success: true,
//       status: 200,
//       data: [user],
//       message: "User logged in successfully",
//     });
//   } else {
//     response({
//       res,
//       success: false,
//       status: 400,
//       data: [],
//       message: "User not found",
//     });
//   }
// };

module.exports = {
  createUser,
  getUsers,
  userLogin,
};

// const createUser = async function main({ req, res }) {
//     const users = await prisma.users.findMany();
//     console.log(users);
//     // send response to the client
//     // Response.json(users);
//     res.json(users);
//     // response({
//     //     res,
//     //     success: true,
//     //     status: 200,
//     //     message: 'Users fetched successfully',
//     //     data: users

//     // })
// }
