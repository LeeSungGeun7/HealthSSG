import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Code is missing" });
  }

  const param = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
    redirect_uri: "http://localhost:3000/api/auth/callback/kakao",
    code: code as string,
  });

  try {
    const codeResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: param.toString(),
    });

    const ACCESS_TOKEN = await codeResponse.json();
    const token = ACCESS_TOKEN.access_token;

    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const result = await response.json();
    console.log("회원정보:", result, token);

    if (result.kakao_account) {
      const email = result.kakao_account.email;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        const newUser = await prisma.user.create({
          data: { email },
        });
      }

      return res.status(200).json({ message: "User authenticated" });
    } else {
      return res.status(400).json({ error: "Failed to get user information" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}