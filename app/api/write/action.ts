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
    const data = response.json()
    return data 

}