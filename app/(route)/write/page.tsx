"use client"
import React, { useState } from 'react'
import Tiptap from '@/components/TIPTAP';
import { MdAddAPhoto } from "react-icons/md"
import { useFormState } from 'react-dom';
import { getUploadUrl, uploadWrite } from './actions';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/states/userAtom';



function page() {
    const [preview , setPreview] = useState("");
    const [uploadUrl , setUploadUrl] = useState("");
    const [imageId , setImageId] = useState("");
    const [bodyContent, setBodyContent] = useState("");
    const [user,setUser] = useRecoilState(userAtom);
    const [errors, setErrors] = useState([]);


    const formData = new FormData();


    const intercepAction = async (_:any, formData : FormData) => {
        const file = formData.get("thumbnail");
        if (!file) {
            return uploadWrite(_,formData);;
        }
        const cloudflareForm = new FormData();
        cloudflareForm.append("file" , file)
        const response = await fetch(uploadUrl, {
            method: "POST",
            body: cloudflareForm
        })
        if (response.status ! == 200) {
            return; 
        }
        const thumbnailUrl = `https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/${imageId}`
        
        if (user && user.id) {
            formData.set('userId', user.id+"");
          }
        formData.set('thumbnail' , thumbnailUrl);
        formData.set('body', bodyContent )
        return uploadWrite(_,formData);
        
    }

     const [state ,action] = useFormState(intercepAction, null)

   


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
        }
        
    }

     
  return (
    <div className='sm:mb-[0] mb-[50px] flex flex-col justify-start items-center w-[100%] h-screen '>

        <form  action={action}  className='flex flex-col justify-evenly h-[100%] w-[85%]' >
            <div className='m-4 text-lg'></div>

            <input 
                className='rounded-md bg-slate-200 p-5 h-[10px] w-[100%] border'
                type="text" 
                id = "title"
                name='title'
                />
            
            {/* <textarea name="body" id="body" className='mt-4 mb-4 h-[70%] border w-[100%]'></textarea> */}
            <Tiptap  onChange={(content) => setBodyContent(content)}  description={formData.get('body')+""} />

            <div className='m-2 flex flex-row'>
                <button className='z-[200] rounded-lg p-[5px] flex justify-center items-center h-[40px] w-[100px] bg-black text-white' type="submit" name="Submit">Submit</button>
                <label htmlFor="thumbnail">

                    <div className='h-[35px] flex items-center justify-center'>
                         <MdAddAPhoto className='w-20 h-[40px]'/>
                        {   
                        preview ? <img src={preview} className="h-[30px] w-[30px] rounded-full"></img> :
                            <div className='text-neutral-400 text-sm'>사진을 추가해주세요.</div> 
                        }
                    </div>
                    

                </label>
                <input onChange={(e)=>{onImageChange(e)}} className='hidden' type="file" name="thumbnail" id="thumbnail" />

            </div>
            
        </form>
    </div>
  )
}

export default page