"use client"
import React, { useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import { signIn , signOut ,useSession } from "next-auth/react"
import Link from '@/node_modules/next/link';
import Router from 'next/router';
import { getToken } from '../api/kakao/route';



function page() {
    //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    const {data : session} = useSession();
    const route = Router
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    
    useEffect(()=>{
        console.log(`${KAKAO_AUTH_URL}`);
    },[])


  return (
    <div className='flex justify-center items-center h-screen bg-slate-300'>
        <div className='h-[100%] w-[100%] sm:h-[500px] sm:w-[500px] sm:rounded-2xl shadow-xl bg-white rounded-none'>
            <div className='flex justify-end m-2 mr-3'>
             <IoIosClose className='text-gray-800 h-[40px] w-[40px]'/>
            </div>
            <div className='w-[100%] flex justify-center items-center'>
                <div className='mr-4 rounded-full bg-slate-600 h-[50px] w-[50px]'/>
                <div className='flex flex-col'>
                    <span className='text-lg font-bold'>WELCOME!</span>
                    <span>이곳에 처음오시나요 ? 회원가입을 해보세요!</span>
                </div>
            </div>
            <Link href={KAKAO_AUTH_URL} className='text-[#371D1E] text-lg ml-[10%] w-[80%] mt-10 p-10 flex justify-center items-center bg-[#FAE100]'>
                카카오 회원가입
            </Link>
            <div onClick={()=>{getToken()}} className='text-[#371D1E] text-lg ml-[10%] w-[80%] mt-10 p-10 flex justify-center items-center bg-[#FAE100]'>
                카카오 로그인
            </div>
        </div>
    </div>
  )
}

export default page