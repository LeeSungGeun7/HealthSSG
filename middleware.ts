import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })
  const { pathname } = req.nextUrl
  
  // 인증이 필요한 경로
  const protectedPaths = ['/mypost','/MyPage','/write']

  // 인증이 필요한 경로인지 확인
  if (protectedPaths.includes(pathname)) {
    // 인증되지 않은 경우 리디렉션
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // 다음 미들웨어 호출
  return NextResponse.next()
}

export const config = {
  matcher: ['/mypost','/MyPage','/write']
}