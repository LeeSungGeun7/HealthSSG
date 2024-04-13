"use server" 
import { PrismaClient } from "@prisma/client" 
import { NextResponse } from "next/server" 
import { z } from "zod" 

const writeSchema = z.object({
    userId: z.number({ required_error: "해당유저가 존재하지않아요" }),
    thumbnail: z.string().optional(),
    username: z.string().max(12).optional(),
  }).refine((data) => data.thumbnail || data.username, {
    message: "닉네임 또는 썸네일 중 하나는 제공되어야 합니다.",
  }); 
    const prisma = new PrismaClient() 
    
    export const UserInfoChange = async (_:any,formData:FormData) => { const data = { userId : Number(formData.get("userId")), thumbnail : formData.get("thumbnail"), username : formData.get("username"), } 
    const result = writeSchema.safeParse(data); 
    if (!result.success) {
        return NextResponse.json(result.error.flatten());
      } else {
        const { userId, thumbnail, username } = result.data;
        const updateData = {
          ...(thumbnail !=="" && { profile: thumbnail }),
          ...(username !=="" && { username }),
        };
      
        const res = await prisma.user.update({
          where: {
            id: userId,
          },
          data: updateData,
        });

        return JSON.parse(JSON.stringify(res));

      }
    }