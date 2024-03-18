import { getUploadUrl } from '@/app/api/write/route';
import React, { useState } from 'react'

function UploadImage({setImageId,setUploadUrl,register}:any) {

    const { onChange, ...rest } = register('thumbnail');
    const [preview , setPreview] = useState("");
    const onImageChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const {
            target : { files } ,
        } = e; 
        if (!files) {
            return
        }

    const file = files[0]
    const url = URL.createObjectURL(file);
        setPreview(url) ;
        const {success , result} = await getUploadUrl();
        if (success) {
            const {id , uploadUrl} = result;
            setUploadUrl(uploadUrl);
            setImageId(id);
        }
        
    }
  return (
    <>
        {preview == "" && "사진을 추가해주세요" }
        <input
  accept='image/*'
  onChange={(e) => {
    onImageChange(e);
    onChange(e); // react-hook-form의 register onChange를 호출
  }}
  type="file"
  {...rest} // register에서 반환된 다른 props 적용
  name="thumbnail"
  id="thumbnail"
/>
     <img className='rounded-full w-[100px] h-[100px]' src={preview} alt="" />
    </>
    
  )
}

export default UploadImage