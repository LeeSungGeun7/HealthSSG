"use server"
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req:NextRequest , res:NextResponse)  {


    const { title , body , userId , type , thumbnail} = await req.json()

    try {

    const post = await prisma.post.create({
        data: {
        title : title , 
        body : body ,
        userId :userId, 
        thumbnail : thumbnail,
        type : "good"  
        }
    });

    NextResponse.json(post);
}   catch (error) {
    NextResponse.json(error+"포스트 생성 실패");
}
}
    
