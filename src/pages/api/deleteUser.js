import prisma from "lib/prisma";

export default async function handler(req, res){
    const DeletedUser = await prisma.user.delete({
        where: { id: 4 }
    });
    res.json(DeletedUser);
}