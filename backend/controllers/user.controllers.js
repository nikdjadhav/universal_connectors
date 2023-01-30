const { PrismaClient } = require('@prisma/client');
const response = require('../lib/response');

const prisma = new PrismaClient();

// *** to create a new user in the database ***
const createUser = async (req, res) => {
    // console.log('requestd body',req.body);
    try {
        const user = await prisma.users.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
        })
        response({
            res,
            success: true,
            status: 200,
            data: user,
            message: 'User created successfully',
        })
    } catch (error) {
        response({
            res,
            success: false,
            status: 400,
            data: [],
            message: 'User not created',
        })
    }
}

// *** to fetch all the users from the database ***
const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        response({
            res,
            success: true,
            status: 200,
            data: users,
            message: 'Users fetched successfully',
        })
        // res.json(users);
    } catch (error) {
        response({
            res,
            success: false,
            status: 400,
            data: [],
            message: 'user not fetched',
        })
    }
}



module.exports = {
    prisma,
    createUser,
    getUsers,
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