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

    if (user) {
      const token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        process.env.ACCESS_TOKEN_SECRET
      );
      response({
        res,
        success: true,
        status: 200,
        data: [
          {
            success: true,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            verrified: true,
            token: token,
          },
        ],
        message: "User created successfully",
        token: token,
      });
    } else {
      response({
        res,
        success: false,
        status: 400,
        data: [
          {
            success: false,
            verrified: false,
            token: null,
          },
        ],
        message: "User not created",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status: 400,
      data: [
        {
          success: false,
          verrified: false,
          token: null,
        },
      ],
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
      data: [
        {
          success: true,
          firstName: logedinUser.firstName,
          lastName: logedinUser.lastName,
          email: logedinUser.email,
          verrified: true,
          token: token,
        },
      ],
      message: "User logged in successfully",
    });
  } else {
    response({
      res,
      success: false,
      status: 400,
      data: [
        {
          success: false,
          verrified: false,
          token: null,
        },
      ],
      message: "User not found",
    });
  }
};

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

const verifyToken = async (req, res) => {
  const values = req.body;
  console.log("values", values);
  try {
    const decoded = jwt.verify(values.token, process.env.ACCESS_TOKEN_SECRET);
    console.log("token", decoded);

    const logedinUser = await prisma.users.findUnique({
      where: {
        loginUser: {
          email: decoded.email,
          password: decoded.password,
        },
      },
    });

    if (logedinUser) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [{
          verified: true
        }],
        message: "User logged in successfully",
      });
      console.log("logedinUser", logedinUser);
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        data: [{
          verified: false
        }],
        message: "User not found",
      });
      console.log("**error");
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      data: [{
        verified: false
      }],
      message: "error",
      verified: false,
    });
    console.log("**errors");
  }
};

module.exports = {
  createUser,
  getUsers,
  userLogin,
  verifyToken,
};
