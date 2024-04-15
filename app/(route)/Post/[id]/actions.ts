"use server"
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

interface Post  {
    id: number;
    like: number;
    thumbnail: string;
    title: string;
    body: string;
    type: string;
    userId: number;
    created_at: Date;
    updatedAt: Date;
    user: User
    comments: Comment[] 
  // 여기에 null을 허용
}

interface Comment {
  id :number;
  like : number; 
  userId : number;
  postId : number | null;
  text: string;
  user: User;
  created_at : Date; 
}

interface User {
  id: number ;
  email: string;
  username: string | null ;
  profile? : string | null;
}

const prisma = new PrismaClient()
export async function getDataById(id:number): Promise<Post | null> {
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
