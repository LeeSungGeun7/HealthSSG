'use client';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import debounce from "lodash/debounce"
const socket = io('http://localhost:3000');

type Message = {
    author: string;
    message: string;
  };






const Chat = () => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [msg , setMsg]:any = useState([]);
    const [msgs , setMsgs] = useState<Array<Message>>([]);
    
    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [handleSend]);

    function handleSend() {
        if (msg == "" ) {
            return
        }
        setMsgs([...msgs,  msg ]);
        socket.emit('message1', msg);
        setMsg('');
  }

    function E(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter' ) {
            debounce(handleSend(),100);
        } 
    }

    useEffect(() => {
        socket.on('message2', (msg) => {
          setMsgs((currentMsg) => [...currentMsg, msg]);
        });
      }, []);
 

    return (
       <>
        <div className='flex flex-col justify-end w-full h-screen bg-blue-300'>
            <div ref={chatContainerRef} className='w-full h-auto overflow-auto'>
            {
                msgs.map((e:any, idx:number)=>{
                    return(
                        <div key={idx} className='flex p-2 justify-start items-center relative bg-yellow-300 m-6 w-[50%] h-[50px] rounded-2xl'>
                            {e}
                             <div className='absolute bottom-[-20px] right-[0] text-[0.8rem] '>1시간전</div>
                         </div>
                    )
                })
            }
            </div>
        
            <div className='relative w-full mb-[100px] sm:mb-[0px] '>
             <input value={msg} onKeyDown={(e)=>{E(e)}} onChange={(e)=>{setMsg(e.target.value) ; }} type="text" className='w-full p-4 rounded-lg' />    
             <button onClick={()=>{handleSend()}} className='absolute rounded-lg w-[60px] right-0 bg-slate-600 h-full'>Send</button>
            </div>
            
        </div>
        </> 
    );
};

export default Chat;


// 채팅 구현 // 메인페이지 꾸미기 // 내일 배포 

