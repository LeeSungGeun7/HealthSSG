"use server"
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req:NextRequest , res:NextResponse)  {


    const { title , body , userId , type , thumbnail} = await req.json()

    //  // 타입 검사
    //  if (typeof userId !== 'number' || typeof title !== 'string' || typeof body !== 'string' || typeof type !== 'string') {
    //     // 잘못된 입력에 대한 응답
    //     return res.status(400).json({ message: 'Invalid input' });
    // }


    try {

    const post = await prisma.post.create({
        data: {
        title : title , 
        body : body ,
        userId :1, 
        thumbnail : thumbnail,
        type : "good"  
        }
    });

    NextResponse.json(post);
}   catch (error) {
    NextResponse.json(error+"포스트 생성 실패");
}


    }
    
export async function getUploadUrl() {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CF_ID}/images/v2/direct_upload`, {
            method: "POST",
            headers: {
                "Content-Type" :"application/json" ,
                "Authorization" : `Bearer ${process.env.NEXT_PUBLIC_CF_API_KEY}`
            }
        }
    );
    const data = response.json()
    return data 

}