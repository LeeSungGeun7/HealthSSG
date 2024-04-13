"use client"
import React, { useEffect, useState } from 'react'
import { useSession , signOut } from 'next-auth/react';
import { SlLogout } from "react-icons/sl";
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '@/states/userAtom';
import debounce from 'lodash/debounce';
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiReadCvLogoLight } from "react-icons/pi";




const center = "flex justify-center items-center"



function Header({setIsModalOpen}:any) {
  const route = useRouter();
  const users = useSession();

  
    const [width, setWidth] = useState(window?.innerWidth);
  
  const handleLocate = (i:string) => {
      if (i == "MyPage" && !users) {
        alert("로그인이 필요합니다.")
      }
      route.push(`/${i}`)
  }

  
  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  },200);


  useEffect(()=> {
    if (!localStorage.getItem('access_token')){
      setUser(null);
    }
  },[])
  
  useEffect(() => {
      window.addEventListener("resize", handleResize);
      console.log(width);
      return () => {
          // cleanup
          window.removeEventListener("resize", handleResize);
      };
  }, [width]);

    const { data: session, status } = useSession();

    
    const pathname = usePathname()
    
    const notAllowed = ["/Portfolio","/write"]

    const setUser = useSetRecoilState(userAtom);
    const user2 = useRecoilValue(userAtom);

    useEffect(() => {
      const fetchUser = async () => {
      
        if (users.data?.user?.email) {
          const rsp = await fetch(`/api/users?email=${encodeURIComponent(users.data.user.email)}`, {
            method: "GET",
          });
          console.log(rsp+"rsp")
          const res = await rsp.json();
          console.log(res+"res");
          if (res.user) {
            setUser(res.user);
          } else {
            console.error('User object not found in the response:', res);
          }
        }
      };
      fetchUser();
    }, [users.data?.user?.email]);
  
    if (width && width < 400) {
      return(
        <div className='z-[1000] flex justify-around items-center fixed bottom-0 w-full h-[50px] bg-slate-200'>
                  <div onClick={()=>{handleLocate("")}} className={`${center} w-[20%] h-[80%] bg-slate-100`}><FaHome/></div>
                  <div onClick={()=>{handleLocate("MyPage")}} className={`${center} w-[20%] h-[80%] bg-slate-100`}><IoPerson/></div>
                  <div onClick={()=>{handleLocate("Post")}} className={`${center} w-[20%] h-[80%] bg-slate-100`}><PiReadCvLogoLight/></div>
                  <div className={`${center} w-[20%] h-[80%] bg-slate-100`}></div>
          </div>
      )
        
    }
    else if (session) {
        return (
          <div className='font-jalnan2 text-#232327 z-[1000] hidden w-screen sm:flex fixed h-[50px]'>
            <div className='m-[25px] w-full flex justify-between'>
                {/* <span className='sm:text-#232327 ml-20 w-[50%] text-xl font-bold text-blue-400'>MR.GEUN</span> */}
                
            </div>
          
            <div  className=' flex  justify-between items-center  w-[150px] m-[38px] '>
              <div className='flex justify-center items-center ml-[20px]'>
              <SlLogout onClick={()=>{setIsModalOpen(true)}} className='w-[15px] h-[15px]'/>
              <Link href={`/MyPage`} className='w-[120px] flex  justify-center items-center'> {user2?.username || ""}</Link>
              </div>
            
            </div>
            
          </div>
        );
      }
      else if (notAllowed.includes(pathname)) {
        return <></>
      } 
      else
      return (
        <>
        <div className='z-[1000] hidden w-screen sm:flex fixed h-[50px]'>
          

            <div className='m-[25px] w-full flex justify-end'>
                {/* <span className='sm:text-white ml-20 w-[50%] text-xl font-bold #232327'></span> */}
                <Link href={'/login'} className='w-[60px] h-[30px] text-white flex items-center justify-center justify-end rounded-lg bg-black'>LOGIN</Link>
            </div>

          
        </div>
        </>
      );
    }
  

export default Header



