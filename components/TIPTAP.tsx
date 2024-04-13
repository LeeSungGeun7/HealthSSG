"use client"
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BiBold } from "react-icons/bi";
import { BsTypeH1 ,BsTypeH2 } from "react-icons/bs";
import { PiTextItalicBold , PiListBulletsBold} from "react-icons/pi";

export default function Tiptap({
    description , 
    onChange , 
} : {
    description : string 
    onChange: (richText : string) => void
}) {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: description,
        editorProps: {
            attributes: {
                class: 
                "rounded-md p-5 border h-[70vh] border-input bg-back"
            }
        },
        onUpdate({editor}) {
            onChange(editor?.getHTML())
            console.log(editor?.getHTML())
        }

    })

    return (
        <div className='h-auto flex flex-col  '>
            <div className="h-[50px] focus:outline-0 toolbar flex items-center justify-evenly">
                <BiBold
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'is-active bg-black text-white rounded-md' : ''}
                >
                    Bold
                </BiBold>
                <PiTextItalicBold
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={editor?.isActive('italic') ? 'is-active' : ''}
                >

                </PiTextItalicBold>
                <PiListBulletsBold
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={editor?.isActive('bulletList') ? 'is-active' : ''}
                >

                </PiListBulletsBold>
                <BsTypeH1
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                </BsTypeH1>
            </div>
            <EditorContent className='rounded-md focus:outline-0 overflow-y-scroll bg-slate-200' editor={editor}/>
        </div>
    )

   

}
