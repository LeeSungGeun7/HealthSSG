"use server"
import { PrismaClient } from "@prisma/client"

 
const prisma = new PrismaClient();
export async function getMyPost(userEmail:string) {
    if (!userEmail || userEmail == "") {
        return 
    }
    const user = prisma.user.findFirst({
        where: {
            email : userEmail
        } ,
        select : {
            id : true
        }
    })
    if (!user) {
        return [];
    }
    const posts = prisma.post.findMany({
        where: {
            userId : user.id,
        }
    })
    return posts;
} 