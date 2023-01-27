import prisma from "lib/prisma";

export default async function handler(req, res){
//     const updatedUser = await prisma.user.update({
//         where: { lastName: "Dev"},
//         data: { lastName: "Doe"}
//     });
//     res.json(updatedUser);
const updatedUser = await prisma.user.update({
    where: { id: 6},
    data: { firstName: "XYZ", lastName: "XYZ"}
});
res.json(updatedUser);

}


