"use server"
import { PrismaClient } from "@prisma/client"
import { revalidateTag } from "next/cache";

 
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

export async function deleteMyPost(ids: Set<number>) {
    const res = await Promise.all(
      Array.from(ids).map((num) =>
        prisma.post.deleteMany({
          where: { id: num }
        })
      )
    )


    if (res.length > 0) {
        return true
    } else {
        return false
    }
    ;
  }

  export async function refreshData() {
    revalidateTag('/mypost')
  }