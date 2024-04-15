"use client"
import { userAtom } from '@/states/userAtom';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { DeleteReply, getDataById, SendReply } from './actions';
import { TiDelete } from "react-icons/ti";
import { getDayMinuteCounter } from '@/utils/TimeCal';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


type Props = {
  params: {
    id: number;
  }
}

interface Post  {
    id: number;
    like: number;
    thumbnail: string;
    title: string;
    body: string;
    type: string;
    userId: number;
    created_at: Date;
    updatedAt: Date;
    user: User
    comments: Comment[] 
  // 여기에 null을 허용
}

interface Comment {
  id :number;
  like : number; 
  userId : number;
  postId : number | null;
  text: string;
  user: User;
  created_at : Date; 
}

interface User {
  id: number ;
  email: string;
  username: string | null ;
  profile? : string | null;
}





function Page ({params}:Props) {
  const [user,setUser] = useRecoilState(userAtom);
  const [data,setData] = useState<Post|null>(null);
  const [reply , setReply] = useState("");
  const route = useRouter();

  const parse = require('html-react-parser').default;
  const getData = async () => {
    const result = await getDataById(Number(params.id));  
    setData(result);
    console.log(result);
  }
  useEffect(() => {
    getData(); // 컴포넌트 마운트 시 데이터 로딩
  }, [params.id]); // params.id가 변경될 때마다 getData를 다시 실행
  
  async function handleDeleteReply(userId:number , commentId:number) {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?')

    if (confirmDelete) {
      try {
        const res = await DeleteReply(userId,commentId);
        if (res) {
          getData();
        }
      } catch (error) {
        alert(`댓글 삭제중 오류가 발셍했습니다.${error}`);
      }
    }
  }
 
  
  
  async function handleSubmit() {
    if (reply.length < 2) {
      alert("2글자 이상 적어주세요");
      return
    }
    if (user && reply !== "") {
      const res = await SendReply(reply,user.id,params.id);
      if (res) {
        setReply("");
        getData();
      }
    }
    else {
      return
    }
  }

  return (
    <div className='flex flex-col  items-center h-auto  w-full bg-white '>
        <div className='flex items-center sm:mt-20 h-[50px] w-full bg-white sm:w-[85%]'>
            <div className='flex items-center justify-between h-[25%] w-full bg-white font-bold text-[25px]'>
                  <div className='m-2'>
                    {data?.user?.username}
                  </div>
                  <div className='m-2 text-[16px]'>{data?.title}</div>
                  <div className='m-2 text-[0.9rem]'>
                    {getDayMinuteCounter(data?.created_at)}
                  </div>
                {/* <Image className='rounded-full' src={`${data?.user?.profile}/avatar`} alt="" width={50} height={50}/> */}
            </div>
        </div>
        
        <div className='w-full h-auto bg-slate-200 sm:w-[85%] text-[20px]'>
          <div className='break-words overflow-hidden min-h-[300px]  bg-slate-100'>
          {data?.body && parse(data.body)}        
          </div>
          
        </div>
          <div className='flex flex-col  justify-center items-center bg-white sm:w-[100%] w-full h-[auto]'>
              <div  className=' flex flex-col min-h-[50vh] justify-center items-center  w-full sm:w-[85%]'>
                {data?.comments.map((e,idx)=>{
                  return(
                    <div  className='m-4 w-full  flex-col sm:w-[100%] flex h-auto justify-center text-black text-[20px]' key={idx}>
                      <div  className='flex flex-row items-center'>
                        <Image className='m-2 h-[35px] w-[35px] rounded-full' src={`${e?.user?.profile}/avatar`} width={50} height={50} alt=""></Image>
                        <div className='m-2' >{e?.user?.username}</div>
                        {e?.user?.id == user?.id && <TiDelete onClick={async()=>{handleDeleteReply(user.id,e.id)}}></TiDelete>}
                        <div className='m-2 text-[0.8rem]'>{getDayMinuteCounter(e?.created_at)}</div>
                      </div>
                      
                      <div className='break-words overflow-hidden rounded-lg m-2 sm:w-[100%] p-2 bg-slate-100 min-h-[100px] h-auto text-[15px] w-full'>
                        
                        <div>{e?.text}</div>  
                      </div>
                     
                    </div>
                  )
                })
                }
              </div>
              <div className='m-2 sm:w-[85%] mb-[70px] sm:mb-[0px] flex justify-center items-center w-full h-[20%] ' >
                  {user ? 
                <div className='w-full flex justify-evenly'>
                    <Image alt='' className='w-[50px] h-[50px] rounded-full' src={`${user?.profile}/avatar`} width={50} height={50}/>
                   <input  value={reply} onChange={(e)=>{setReply(e.target.value);}} className='focus:outline-none bg-slate-100 rounded-xl p-4 w-[60%] ' type="text" /> 
                   <motion.button 
                   className='disabled:hidden text-white rounded-2xl bg-black w-[15%] text-[0.8rem]' 
                   onClick={handleSubmit}
                   whileTap={{scale: 1.1}}
                   whileHover={{scale:0.9}}
                   disabled={reply.length>400}
                   >댓글작성</motion.button>
                   <button disabled={reply.length>400} className="hidden disabled:block text-red-400">
                    {`${reply.length}/400`}
                  </button>
                   
                </div>

                :
                  <div>
                    댓글을 달기 위해서는 
                    <Link className='m-2 text-white bg-black ' href="/login">로그인</Link>
                    이 필요합니다.
                  </div>
                }
              </div>
          </div>
    </div>

  )
}

export default Page