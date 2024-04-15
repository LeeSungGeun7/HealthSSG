"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { deleteMyPost, getMyPost } from './action';
import { MdDelete } from "react-icons/md";
import Image from 'next/image';
import Modal from '@/components/Modal/Modal';
import { BsCheckAll } from "react-icons/bs";

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

function Page() {
  DeleteButton.displayName = 'DeleteButton';
    const {data: session} = useSession();
    //user.data?.user?.email
    const [data , setData] =useState<(Post & { isDeleted: boolean })[]>([]);
   // const [deleteItems,setDeleteItems] = useState<number[]>([]);
    const email = session?.user?.email;
    
    const [deleteItems, setDeleteItems] = useState<Set<number>>(new Set());
    const [trigger, setTrigger] = useState(false);
    const [isDel , setIsDel] = useState(false);
    const [modalOnOff,setModalOnOff] = useState(false);

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

      function handleAllSelect() {
        if (deleteItems.size === data.length) {
          deleteItems.clear();
        } else {
          data.forEach((e)=>{
            deleteItems.add(e.id)
          })
        }
      }

      
      function handelIsDelete() {

        if (deleteItems.size >= 1) {
          setModalOnOff(true)
        } else {
          setIsDel(!isDel)
        }
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
    },[email,trigger])

    

  return (

    <div className={`flex-col w-full h-screen ${center}`}>
        <div className=' bg-slate-200 flex justify-between w-[100%] h-[10%] sm:w-[85%] sm:h-[5%] '>
          <div className='w-[50%]'>

          </div>
          <div className='flex items-center justify-end w-[50%]'>
          {isDel && <BsCheckAll onClick={()=>{handleAllSelect(); setTrigger(!trigger)}} className='w-[20px] h-[20px]'>All</BsCheckAll>}
            <MdDelete className='m-4 w-[30px] h-[30px]' onClick={()=>{handelIsDelete()}}/>
          </div>
          
        </div>
        <div className='overflow-scroll gap-1 p-4 grid-rows-3 justify-center grid sm:grid-cols-3 grid-cols-2 w-[100%] h-[90%] sm:w-[85%] sm:h-[80%] bg-slate-100'>
        {data.map((item, idx) => {
  return (
    <div key={idx} className='flex justify-center items-center relative bg-white w-[200px] md:[250px] sm:w-[220px] h-[200px]'>
      {item.title}
      <Image className='absolute w-full h-full' src={`${item.thumbnail}/medium`} width={100} height={100} alt=""/>
      <DeleteButton
  isDel={isDel}
  itemId={item.id}
  isDeleted={deleteItems.has(item.id)}
  onToggle={() => handleAppendDel(item.id)}
/>
    </div>
  );
})}
        </div>
        <Modal isOpen={modalOnOff} setIsModalOpen={setModalOnOff} onClick={async()=>{
          const res =await deleteMyPost(deleteItems);
          if(res == true) {
            setModalOnOff(false);
            setTrigger(!trigger);
            setIsDel(false);
          } else {
            setModalOnOff(false);
            alert("삭제 실패");
          }
          }} >{`${deleteItems.size}개의 게시물을 삭제하시겠습니까?`}</Modal>
    </div>
  )
}

const DeleteButton = React.memo(({isDeleted, onToggle, isDel }:any) => {
  
    return (
      isDel &&
      <>
      <button
        onClick={onToggle}
        className={`m-2 absolute right-4 top-0 rounded-full w-[20px] h-[20px] ${
          isDeleted ? 'bg-black' : 'bg-slate-300'
        }`}
      ></button>
      
      </>
    );
  });
  DeleteButton.displayName = 'DeleteButton';

export default Page