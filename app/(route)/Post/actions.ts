"use server"

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



const prisma = new PrismaClient()

export async function getMoreData(page:number,userId?:number) {
    const posts = await prisma.post.findMany({
        // select: {
        //     title: true,
        //     body: true,
        //     created_at: true,
        //     id: true , 
        //     thumbnail: true,
        //     user:true,
        // },

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
                  userId: userId, // << 임시값 변경
                },
                select: {
                  userId: true,
                },
            }   
        },
        skip: page * 1,
        take : 1 ,
        orderBy: {
            created_at : "desc",
        },
    
    });
    const postsWithLikeStatus = posts.map((post) => ({
        ...post,
        postLike: post.postLike.length > 0,
    }));

    return postsWithLikeStatus;

    // return posts;
}

export async function getRecentPost() {
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
                  userId: Number(2),
                },
                select: {
                  userId: true,
                },
            }   
        },
        take : 4 ,
        orderBy: {
            created_at : "desc",
        },
    
    });
    const postsWithLikeStatus = posts.map((post) => ({
        ...post,
        postLike: post.postLike.length > 0,
    }));

    return postsWithLikeStatus;

}