import prisma from "lib/prisma";

// const users = prisma.user.findMany();
//   console.log(users);
//   res.json(users);

export default async function handler(req, res){
    const users = await prisma.user.findMany();
    res.json(users);

    // const updatedUser = await prisma.user.update({
    //     where: { id: 6},
    //     data: { firstName: "XYZ", lastName: "XYZ"}
    // });
    // res.json(updatedUser);
}
