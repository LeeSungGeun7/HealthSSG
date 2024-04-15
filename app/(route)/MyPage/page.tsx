"use client"
import React, { useEffect, useState } from 'react'
import { MdAddAPhoto } from "react-icons/md"
import { useFormState } from 'react-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/states/userAtom';
import { getUploadUrl, uploadWrite } from '../write/actions';
import { UserInfoChange } from './actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';






function Page() {
    const [uploadUrl , setUploadUrl] = useState("");
    const [imageId , setImageId] = useState("");
    const [user,setUser] = useRecoilState(userAtom);
    const [preview , setPreview] = useState("");
    const [userName , setUserName] = useState("");
    const [isOpen , setIsOpen] = useState(false);
    const route = useRouter();

    const [thumbnailUrl2, setThumbnailUrl] = useState("");

    useEffect(() => {
        console.log(thumbnailUrl2);
        
      }, [thumbnailUrl2]);

    const user2 = useSession();
    if (!user2) {
        route.push('/login');
    }

    useEffect(() => {
        setUserName(user?.username || "");
        if(user?.profile) {
            setPreview(user?.profile+"/avatar" || "");
        } 
    
      }, [user?.username,user?.profile]);

    const formData = new FormData();


    const intercepAction = async (_:any, formData : FormData) => {
        const file = formData.get("thumbnail");
        let thumbnailUrl = "";
        if (file) {
            const cloudflareForm = new FormData();
            cloudflareForm.append("file", file);
            const response = await fetch(uploadUrl, {
            method: "POST",
            body: cloudflareForm,
            });

            if (response.status === 200 ) {
                thumbnailUrl =(`https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/${imageId}`);

            } else {
                // throw new Error("이미지 업로드에 실패했습니다.");
            }            
        }
        if (user && user.id) {
            formData.set('userId', user.id.toString());
          }     
        formData.set('thumbnail', thumbnailUrl);
        formData.set('username', userName);
        //formData.set('thumbnail', thumbnailUrl);
        const res = await UserInfoChange(_,formData);
            if (res) {
                    alert("성공");
                    route.refresh();

            } else {
                alert("실패");
            }    
       
    }
    

    const [state ,action] = useFormState(intercepAction,null)

    


    const onImageChange = async (event : React.ChangeEvent<HTMLInputElement>) => {
        const { 
            target : { files },
        } = event;
        if (!files) {
            return
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url); 
        const {success , result} = await getUploadUrl(); 
        if (success) {
            const { id , uploadURL } = result ;
            setUploadUrl(uploadURL); 
            setImageId(id);
            setThumbnailUrl(`https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/${imageId}`);
        }   
    }
    
   

     
  return (
    <div className='bg-slate-200 flex flex-col justify-center items-center w-[100%] h-screen '>
         <Link href={'/mypost'} className='flex justify-center text-[15px] w-[80px] absolute left-0 top-12 m-6 rounded-md bg-white text-black'>My Post</Link>
          <form  action={action}  className='flex flex-col justify-center items-center h-[70%] w-[85%]' >
          <div className='relative rounded-full bg-slate-600 w-[230px] h-[235px] flex items-center justify-center'>
                <label className='rounded-full w-full h-[100%]' htmlFor="thumbnail">       
                        {   
                        preview ? <Image width={100} height={100} alt="" src={preview} className="h-[100%] w-[100%] rounded-full"></Image> :
                        <MdAddAPhoto className='absolute right-[31%] top-[42%] w-20 h-[40px]'/>
                        }
                        </label>
                    </div>
    
            <div className='text-lg'></div>
          {user? 
            <input 
            className='text-black text-[20px] rounded-2xl p-5 h-[10px] w-[200px] border-black'
            type="text" 
            id = "name"
            name='name'
            onChange={(e)=>{setUserName(e.target.value)}}
            value={userName}
            />
            :    
            <></>
        }
            
            



            <div className='flex flex-row'>
                <button className='m-5 rounded-lg p-[5px] flex justify-center items-center h-[40px] w-[100px] bg-black text-white' type="submit" name="Submit">수정하기</button>
                
                <input onChange={(e)=>{onImageChange(e)}} className='hidden' type="file" name="thumbnail" id="thumbnail" />

            </div>
            
        </form>
    </div>
  )
}

export default Page;