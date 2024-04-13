

import { signOut } from 'next-auth/react';


export const KakaoLogout = async (ACCESS_TOKEN:any) => {
        const response = await fetch(`https://kapi.kakao.com/v1/user/logout`,{
            method : "POST",
            headers: {
            "Authorization" : `Bearer ${ACCESS_TOKEN}` ,
             "Content-Type": "application/x-www-form-urlencoded"
            }
        })    
        const res = await response.json()
        if (res) {
            signOut({redirect:false});
        }
    return res
}