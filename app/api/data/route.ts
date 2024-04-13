import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



const prisma = new PrismaClient()

export async function GET(req: NextRequest, res: NextResponse) {
        const url = new URL(req.url)

        const userId = url.searchParams.get("userId")
        console.log(userId +"<<<<<<<<");
        return
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                body: true,
                created_at: true,
                id: true , 
                thumbnail: true,
                user:true,
                _count: {
                    select: {
                        postLike: true
                    }
                },
                postLike: {
                    where: {
                      userId: Number(userId),
                    },
                    select: {
                      userId: true,
                    },
                }   
            },
            take : 1 ,
            orderBy: {
                created_at : "desc",
            },
        });
        const postsWithLikeStatus = posts.map((post) => ({
            ...post,
            postLike: post.postLike.length > 0,
        }));

        return new Response(JSON.stringify(postsWithLikeStatus));

        return NextResponse.json(posts);

        // GET 메서드만 지원함
        
    
}