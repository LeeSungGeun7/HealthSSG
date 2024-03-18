"use client"
import React, { useState } from 'react'
import { useForm} from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Tiptap from '@/components/TIPTAP';
import UploadImage from '@/components/UploadImage';





const formSchema = z.object({
    title: z
    .string()
    .min(1, {message:" 제목을 입력해주세요 "})
    .max(20, {message:"너.무.길.어"}) ,
    body: z
    .string()
    .min(10, {message: "10자 이상 적어주세요"})
    .max(200, {message: "너무길어요"})
    .trim(),
    thumbnail : z
    .any()
})

function page() {
    const [uploadUrl , setUploadUrl] = useState("");
    const [imageId , setImageId] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        mode : 'onChange' ,
        defaultValues : {
            title : '' ,
            body : '' ,
        }

    })
    const { register, handleSubmit, formState: { errors } } = form;
    const onSubmit = async (data:any) => {
        try {
            console.log(JSON.stringify(data));
            const response = await fetch('/api/write', {
                method: "POST",
                headers: {
                    'CONTENT-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('문제발생')
            }
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

     
  return (
    <div className='flex flex-col justify-start items-center w-[100%] h-screen '>

        <form  className='w-[85%]' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-lg'>Title</div>
            <input 
                className='p-5 h-[10px] w-[100%] border'
                type="text"
                {...register("title")}
            placeholder={errors.title && errors.title.message}
            />
            
            <Tiptap  onChange={(content) => form.setValue('body', content)} description={form.watch('body')} />
            {errors.body && <p>{errors.body.message}</p>}
            <div className='flex flex-row'>
                <button className='rounded-lg p-[5px] flex justify-center items-center h-[40px] w-[100px] bg-black text-white' type="submit" name="Submit">Submit</button>
                <UploadImage setImageId={setImageId} setUploadUrl={setUploadUrl} register={register}/>
            </div>
            
        </form>
    </div>
  )
}

export default page