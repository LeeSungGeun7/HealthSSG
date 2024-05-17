import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";

const center = 'flex justify-center items-center'


const RR = ({alt}:any) => {
    if (alt == "MdOutlineSpaceDashboard") {
        return <MdOutlineSpaceDashboard/>
    }
    else if (alt == "FaPerson") {
        return <FaPerson></FaPerson>
    } else {
        return <FaCommentAlt></FaCommentAlt>
    }
}


function page() {
    const arr = [{name:"",alt:"MdOutlineSpaceDashboard"},{name:"",alt:"FaPerson"},
    {name:"",alt:"FaCommentAlt"}]
  return (
    <>
    <div className='h-[50px] bg-black w-full'>
        
    </div>
    <div className={`flex h-screen w-full`}>
        <div className='p-2 flex flex-col items-center w-[150px] bg-[#403f3f] h-full'>
            <div className='mt-4 text-slate-300'>
                SSG
            </div>
                <div className='flex flex-col items-center bg-[#403f3f] text-white w-full h-[50%]'>
                    {arr.map((item,idx)=>{
                        return(
                            <div className='hover:text-black mt-[60px]' key={idx}>
                                <div className='flex items-center'>
                                <RR alt={item.alt}/> 
                                   <div className='ml-2'>
                                        {item.name}    
                                   </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='bg-slate-100 w-full h-[50%]'>
                    
                </div>
        </div>
        <div className='w-[full] bg-white h-full'>
            main
        </div>
    </div>
    </>
  )
}

export default page