// app/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao"
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    KakaoProvider({
        clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET as string,
      }
      )
      
      ,
    // 다른 인증 제공자 추가
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email; // 프로바이더로부터 받은 이메일
      if (email) {
        try {
          // 데이터베이스에서 사용자 조회
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });
          if (existingUser) {
            // 사용자가 이미 존재한다면 로그인 성공 처리
           
            return true;
          } else {
            // 존재하지 않는다면 새로운 사용자 추가
            const newUser = await prisma.user.create({
              data: {
                email: email,
                // 필요한 경우 추가적인 필드 설정
              },
            });
           
            return true;
          }
        } catch (error) {
          // 데이터베이스 오류 처리
          console.error("User signIn error:", error);
          return false; // 로그인 실패 처리
        }
      } else {
        // 이메일이 없는 경우 로그인 실패 처리
        return false;
      }
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
      // return { ...token, ...user };
    },
    async session({ session, token }:any) {
      // 사용자 세션에 사용자 정보 추가
      session.user = token.user;
      console.log(session);
      return session;
    },
    //   session.user.id = token.sub as string;
    //   console.log(session+"이게 세션이냐 ")
    //   return session;
    // },
  },
  
  // 추가적인 NextAuth 설정
});

export {handler as GET , handler as POST}