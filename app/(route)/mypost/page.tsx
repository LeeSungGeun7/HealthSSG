"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { getMyPost } from './action';

const center = "flex justify-center items-center"



interface Post {
        id: number;
        like: number;
        thumbnail: string;
        title: string;
        body: string;
        type: string;
        userId: number;
        created_at: Date;
        updatedAt: Date;
}

function page() {
    const {data: session} = useSession();
    //user.data?.user?.email
    const [data , setData] =useState<(Post & { isDeleted: boolean })[]>([]);
   // const [deleteItems,setDeleteItems] = useState<number[]>([]);
    const email = session?.user?.email;
    
    const [deleteItems, setDeleteItems] = useState<Set<number>>(new Set());

    function handleAppendDel(e: number) {
        setDeleteItems((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(e)) {
            newSet.delete(e);
          } else {
            newSet.add(e);
          }
          return newSet;
        });
      }
      

    
      useEffect(() => {
        console.log('deleteItems:', deleteItems);
      }, [deleteItems]);  
    
    useEffect(()=>{
        
        async function getData() {
            if (email) {
                const res = await getMyPost(email)
                setData(res);
            } 
         }
         getData();
    },[email])

    

  return (

    <div className={`flex-col w-full h-screen ${center}`}>
        <div className='w-[100%] h-[10%] sm:w-[85%] sm:h-[5%] bg-blue-400'>
            
        </div>
        <div className='overflow-scroll grid grid-cols-3 w-[100%] h-[90%] sm:w-[85%] sm:h-[80%] bg-slate-100'>
        {data.map((item, idx) => {
  return (
    <div key={idx} className='relative bg-white w-[200px] h-[200px]'>
      {item.title}
      <DeleteButton
  itemId={item.id}
  isDeleted={deleteItems.has(item.id)}
  onToggle={() => handleAppendDel(item.id)}
/>
    </div>
  );
})}
        </div>
    </div>
  )
}

const DeleteButton = React.memo(({ itemId, isDeleted, onToggle }:any) => {
    return (
      <button
        onClick={onToggle}
        className={`m-2 absolute right-0 top-0 rounded-full w-[20px] h-[20px] ${
          isDeleted ? 'bg-blue-500' : 'bg-slate-300'
        }`}
      ></button>
    );
  });

export default page