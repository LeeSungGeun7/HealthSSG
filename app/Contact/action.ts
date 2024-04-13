"use server"
import { getDayMinuteCounter } from "@/utils/TimeCal";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface Contact {
    id: number;
    createdAt: Date;
    content: string | null;
    like: number;
    comments: Comment[];
  }
 
  interface Comment {
    id: number;
    like: number;
    text: string;
    userId: number;
    postId: number;
    contactId: number | null;
    created_at: Date;
    updatedAt: Date;
  }  

const prisma = new PrismaClient()

export async function CreateContactRe(userId:number , content:string) {
    const latestDate = await prisma.comment.findMany({
        where: {
          userId :  userId ,
          contact : {
            id : 1
          } 
        },
        orderBy: {
            id: 'desc'
        },
        take : 1,
        select: {
            created_at : true
        }
    })
    if (latestDate.length > 0) {
        const divParam = (24* 60 * 60 * 1000);
        const commentDate:Date = latestDate[0].created_at;
        const curDate = Date.now();
        const diffSec = curDate - commentDate.getTime();
        const diffDay = diffSec / divParam
        console.log(diffDay+"<<<");
        if (diffDay > 1 ) {
            console.log(diffDay);
            const res = await prisma.comment.create({
                data:{
                    contactId: 1,
                    userId :  userId ,
                    text : content 
                }
            })
            return "작성완료"; 
        }
        else {
            return "하루에 한개씩만 작성가능";
        }
    } else {
        const res = await prisma.comment.create({
            data:{
                contactId: 1,
                userId : userId,
                text : content 
            }
        })
        return "작성완료"; 
    }
    
    
}

export async function ReadContactRe(): Promise<Contact[]> {
    const data = await prisma.contact.findMany({
        where:{
            id: 1 
        }, 
        include: {
            comments: {    
                include: {
                    user: true
                }
            },
        }
    })
    return data;
}

export async function DelContactRe(commentId:number,userId:number) {
    const res = await prisma.comment.delete({
        where:{
            id: commentId,
            userId: userId
        } , 
    })
}

