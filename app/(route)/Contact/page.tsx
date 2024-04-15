"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { MdEmail } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';
import { IoArrowBackOutline } from "react-icons/io5";
import { useRecoilState } from 'recoil';
import { userAtom } from '@/states/userAtom';
import { CreateContactRe, ReadContactRe } from './action';

import { getDayMinuteCounter } from "@/utils/TimeCal";


interface Contact {
  id: number;
  createdAt: Date;
  content: string | null;
  like: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  like: number;
  text: string;
  userId: number;
  postId: number | null;
  contactId: number | null;
  created_at: Date;
  updatedAt: Date;
  user: {
    id: number;
    email: string;
    username: string | null;
    role: any;
    phone: string | null;
    post: string | null;
    profile: string | null;
    createdAt: Date;
    updatedAt: Date;
  }; 
}

const center = "flex justify-center items-center"

const Reply = ({setTurn,comments}: {setTurn: ()=> void; comments: Comment[] | undefined}) => {
  return (
    <AnimatePresence>
    <motion.div
     className
     ='flex flex-col overflow-hidden right-0 absolute w-[100%] h-full bg-white'
      transition={{ duration: 0.5, ease: 'easeOut' }}
      initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
     >
      <IoArrowBackOutline className='h-[10%] w-[50px]' onClick={()=>{setTurn()}}/>
      <div className='bg-white h-[90%] overflow-y-scroll'>
          {comments?.map((e:Comment,idx:number)=>{
            return(
              <div className=' p-4 flex min-h-[100px] h-auto  w-full bg-white' key={idx}>
                  <div className='m-4 justify-center w-[15%] flex flex-col items-center'>
                    <Image alt='' className='rounded-full' quality={100} src={`${e?.user?.profile}/avatar`} width={50} height={50}/>
                    <p className='whitespace-normal overflow-hidden text-ellipsis w-auto m-2 text-[13px] '>{e?.user?.username}</p>
                    <div className='whitespace-normal overflow-hidden text-ellipsis w-auto text-[15px]'>{getDayMinuteCounter(e?.created_at)}</div>
                  </div>
                  
                  <div className='p-4 rounded-xl bg-slate-100 break-words w-[90%] overflow-hidden h-auto'>
                    {e?.text}                    
                  </div>
                  
              </div>
            )
          })} 
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

function Page() {
  const [reply, setReply] = useState("")
  const [turn,setTurn] = useState(false);



  const [comments,setComments] = useState<Comment[]>([]);

  const user = useRecoilState(userAtom);
  //const user = useSession();
  //const email = user.data?.user?.email;
  
 


  async function getData(): Promise<Contact[]> {
    const res = await ReadContactRe();
    return res;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const data:Contact[] = await getData();
      const comments = data.map((contact) => contact.comments).flat();
      setComments(comments);
    };
    fetchData();
  }, []);

  async function handleSendReply(userId:number, text:string) {
      if ( text.length < 2) {
        return 
      }
      const res = await CreateContactRe(userId,text)
      if (res == "작성완료") {
        alert(res);
        setReply("");
      } else {
        alert(res);
      }
  }

  return (
    <div className={`${center} h-screen w-screen bg-slate-100`}>
        <div className='overflow-hidden relative flex  items-center justify-center flex-col sm:h-[70%] sm:w-[50%] h-[100%] w-[100%] bg-white'>
        {comments &&turn && <Reply comments={comments} setTurn={()=>setTurn(!turn)}/>}
            <div className='flex justify-between items-center m-4 h-[10%] w-[90%] '>
                <div className='flex items-center'>
                  <Image quality={100} alt="" className='rounded-full' width={50} height={50} src={"https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/71921eef-1b3b-4283-680a-d4633119d900/avatar"}/>
                  <div className='m-4'>LSG</div>
                </div>
                <div className='flex items-center '>
                  <Link className='m-2' href={"mailto:sungkeno3o@gmail.com"}><MdEmail className='h-[25px] w-[25px]' /></Link>
                  <Link target={"_blank"} href={"https://github.com/LeeSungGeun7"}><FaGithubSquare className='h-[25px] w-[25px]'/></Link>
                </div>
                
               
            </div>
            <div className='m-2 h-[60%] w-[90%] bg-slate-100'>
                <Image quality={100} width={100} height={100} className='w-full h-full' alt='' src={"https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/1d666bde-3b19-48e1-e3c6-18227a5a4800/medium"} />
            </div>
            <div className='flex flex-col justify-center items-center m-4  h-[30%] w-[90%] '>
                <div className='flex justify-start h-[25%] w-full bg-white'>
                    <FaHeart className='m-2 h-[15px] w-[15px]'/>
                    <FaRegCommentDots onClick={()=>{setTurn(!turn)}} className='m-2 h-[15px] w-[15px]' />
                </div>

                <div className='h-[70%] flex items-center w-full'>
                  <input placeholder='2글자 이상 적어주세요' value={reply} onChange={(e)=>{setReply(e.target.value)}} className='focus:outline-none pl-4 bg-slate-100 m-2 p-2 rounded-2xl w-[85%]' type="text" />
                 { user && <button disabled={reply.length<2} onClick={()=>{handleSendReply(1,reply)}} className='mr-1 w-[15%] text-white bg-black rounded-xl'>send</button>}
                </div>
                
            </div>
        </div>
      </div>
  )
}

export default Page