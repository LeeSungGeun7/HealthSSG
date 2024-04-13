"use server"
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { redirect } from 'next/navigation'


const db = new PrismaClient()

const writeSchema = z.object({
    userId : z.
    number({
        required_error : "해당유저가 존재하지않아요"
    }),
    thumbnail : z.
    string({
        required_error : "썸네일을 선택해주세요"
    }),
    title : z.
    string({
        required_error : "제목을 입력해주세요"
    }).min(2).max(20),
    body : z.
    string({
        required_error : "내용을 입력해주세요"
    }).min(5)
})

export async function handleForm(prevState : any , formData: FormData){
    console.log(prevState);
    await new Promise((resolve) => setTimeout(resolve,5000));
    return {
        errors: ["wrong password" , "password to short"]
    }
}

export async function uploadWrite(_:any, formData: FormData) {
    const data = {
        userId : Number(formData.get("userId")),
        thumbnail : formData.get("thumbnail"),
        title : formData.get("title"),
        body : formData.get("body")
    }
        const result = writeSchema.safeParse(data);
        if (!result.success) {
            return result.error.flatten()
        } else {
            await db.post.create({
                data: {
                    title : result.data.title,
                    body : result.data.body,
                    thumbnail : result.data.thumbnail,
                    type : "any",
                    user : {
                        connect : {
                            id: result.data.userId
                        }
                    }

                }
            })
          redirect('/Post');  
        }
        // 카톡로그인후 유저아이디 매핑 임시로 1로 고정 
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
    const data = await response.json();
    return data;
}