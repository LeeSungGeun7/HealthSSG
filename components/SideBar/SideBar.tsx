"use client"
import React, { use, useEffect, useState } from 'react'
import Div from '../Div'
import { AiOutlineHome } from "react-icons/ai";
import { TbMessageChatbot } from "react-icons/tb";
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/states/userAtom';
import Image from 'next/image';



function SideBar() {
    const [isOpen , setIsOpen] = useState(false)
    const arrs = ["Home", "Chat" , "Post", "Contact"]
    const [isActive, setIsActive] = useState(0)
    const pathName =usePathname()
    const notAllowed = [ "/write"]
    const user = useRecoilValue(userAtom);


    useEffect(() => {
        console.log('User state:', user);
      }, [user]);

    const handleIsActive = (e:String) => {
        switch (e) {
            case 'Home' : setIsActive(1)
                break;
            case 'Chat' : setIsActive(2)
                break;
            case 'Portfolio' : setIsActive(3)
                break;    
            case 'Contact' : setIsActive(4)
                break;                     
        }
    }
     
    const variants = {
        open: {
            textColor : "white",
            clipPath : "circle(1200px at 50px 40px)",
            transition: {
                type: "spring", 
                stiffness: 20,
            }
        } ,
        closed: {
            clipPath : "circle(20px at 50px 40px)",
            transition: {
                delay : 0.01,
                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        }
    }
  if (notAllowed.includes(pathName)) {
    return <></>
  }  
  else
  return (
    <motion.div 
    variants={variants}
    animate={ isOpen ? "open" : "closed" }
    className={`z-[100] hidden w-[100%] h-[20%] left-0 bottom-0 fixed sm:flex flex-row justify-between sm:justify-center sm:flex sm:fixed sm:flex-col items-center  sm:h-screen sm:w-[25%] ${isOpen ? 'bg-[white]' : 'bg-none'}  `}>
        <button onClick={()=>{setIsOpen(!isOpen)}} className={` hidden  sm:flex justify-center items-center fixed left-[25.5px] top-6 h-[38px] w-[50px]`}>
            <svg width="23" height="23" viewBox='0 0 23 23' >
                <motion.path
                strokeWidth="3"
                stroke={`${isOpen ? "black": "#232327"}`}
                strokeLinecap="round"
                variants={{
                    closed: {d: "M 2 2.5 L 20 2.5"},
                    open: {d: "M 3 16.5 17 2.5"},
                }}
                />
                <motion.path
                strokeWidth="3"
                stroke={`${isOpen ? "black": "#232327"}`}
                strokeLinecap="round"
                variants={{
                    closed: {d: "M 2 16.345 L 20 16.345"},
                    open: {d: "M 3 2.5 17 16.345"},
                }} />
            </svg>
        </button>
        
          {
            user?.profile &&
            <Image width={200} height={50} className=' p-4 hidden sm:flex sm:mb-10 rounded-full h-[50px] sm:h-[200px]' src={`${user?.profile}/avatar`} alt="" />   
          }      
         
         

          {
           arrs.map((e,idx)=>{
            return(
                <React.Fragment key={idx}>
                 <div >
                    <div  onClick={()=>{handleIsActive(e)}} className= {` flex justify-start items-center `}>
                        {e == "Home" && <AiOutlineHome  className={`${isActive == 1 ? "text-blue-500" : "text-black"}`}/>}
                        {e == "Chat" && <TbMessageChatbot  className={`${isActive == 2 ? "text-blue-500" : "text-black"}`}/>  }
                        {e == "live" && <TbMessageChatbot  className={`${isActive == 3 ? "text-white" : "text-black"}`}/>  }
                        <Div   name={e} number={isActive}></Div>
                    </div>
                </div>
                </React.Fragment>
            )
           }) 
          }
          {isOpen && (
                <div className="z-[1000] right-0 fixed h-screen w-[75vw] bg-black bg-opacity-30" onClick={()=>{setIsOpen(false)}}></div>
            )}
    </motion.div>
        
  )
}


export default SideBar