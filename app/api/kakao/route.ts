import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getToken() {
    const search = new URLSearchParams(window.location.search)
    
    const code = search.get("code");

    if (!code) {
        return {}
    }

    const param = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
        redirect_uri: "http://localhost:3000/api/auth/callback/kakao", 
        code : code
    })

    const code_response = await fetch('https://kauth.kakao.com/oauth/token',{
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body : param
    })
    // 코드를 토큰값으로 받아옴

    const ACCESS_TOKEN = await code_response.json();
    const token = ACCESS_TOKEN.access_token;
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
            
        method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }

        })
        const result = await response.json()
        console.log('회원정보 :' , result , token)
        
        
        if (result.kakao_account) {
            
            const email = result.kakao_account.email

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email : email
                    }

                })
                if (!user) {
                    const newUser = await prisma.user.create({
                        data: {
                          email,
                        },
                      });
                }
            }
            catch (error) {
                result.status(500).json({error: '사용자 조회중 오류 발생'})
            }

        }
    
    
    

}