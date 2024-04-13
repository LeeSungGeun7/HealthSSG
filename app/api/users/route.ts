import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { PrismaClient } from "@prisma/client";

import { request } from "http";

const prisma = new PrismaClient()


export async function GET(req:NextRequest) {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return new NextResponse(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        console.log(user);
       return NextResponse.json({ok:true,user});
        
}

interface RequestLike {
    id : number 
    like : boolean 
    likeId : number
}

export async function POST(req: NextRequest) {
    const { userId, like, postId }: { userId: number; like: boolean; postId: number } = await req.json();
    try {
      if (userId && postId && like !== undefined) {
        if (like) {
          const user = await prisma.postLike.create({
            data: {
              userId,
              postId,
            },
          });
          return NextResponse.json({ ok: true, user });
        } else {
          const deletedUser = await prisma.postLike.deleteMany({
            where: {
              postId,
              userId,
            },
          });
          return NextResponse.json({ ok: true, deletedUser });
        }
      } else {
        return NextResponse.json({ ok: false, error: 'Invalid request data' }, { status: 400 });
      }
    } catch (error) {
      console.error('Error updating like:', error);
      return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
    }
  }

