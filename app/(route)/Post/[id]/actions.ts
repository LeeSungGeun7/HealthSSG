"use server"
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";



const prisma = new PrismaClient()
export async function getDataById(id:number) {
    const posts = await prisma.post.findFirst({
        where: {
            id : id 
        } ,
        select : {
            id : true ,
            user : true ,
            like : true ,
            thumbnail: true,
            type: true,
            title: true ,
            body: true , 
            userId: true,
            created_at: true,
            updatedAt: true,
            comments : 
                {
                    include : {
                        user: true
                    }
                }
            ,
        }      
    });
    return posts;
}


export async function SendReply(content:string , userId:number , postId:number) {
    const posts = await prisma.comment.create({
        data: {
            text : content ,
            userId : userId , 
            postId : Number(postId)
        }
    })
    if (posts) {
        return posts;    
    } else {
        return null;
    }
}


export async function DeleteReply(userId:number , commentId:number) {
    if (!userId || !commentId){
        return 
    }
    const res = await prisma.comment.deleteMany({
        where: {
            id : commentId , 
            userId : userId
        }
    })
        return res;
}
