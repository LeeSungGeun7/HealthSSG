const KakaoUserInfo = () => {

    const GetUserInfo = async () => {

        const ACCESS_TOKEN = localStorage.getItem("access_token")

        const response = await fetch("https://kapi.kakao.com/v2/user/me", {
            
        method: "GET",
            headers: {
                "Authorization" : `Bearer ${ACCESS_TOKEN}`,
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }

        })
        const result = await response.json()
        console.log('회원정보 :' , result , ACCESS_TOKEN)
        return result
    }
    return(
        <button onClick={GetUserInfo}>유저정보 확인</button>
    )
}

export default KakaoUserInfo