"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useRef ,useEffect , useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { getMoreData } from './actions';
import debounce from 'lodash/debounce';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/states/userAtom';



interface DataProps {
  id : number ; 
  title : string; 
  body : string ;
  thumbnail : string ;
  created_at : Date ;
  
}



function Page() {
    const trigger = useRef<HTMLSpanElement>(null);
    const [loading , setLoading] = useState(false);
    const [page , setPage] = useState(0);
    const [isLastPage , setIsLastPage] = useState(false);
    const [data,setData]:any = useState([])
    const router = useRouter();
    const parse = require('html-react-parser').default;
    const [user,setUser] = useRecoilState(userAtom);
    
    
    useEffect(() => {
      const handleScroll = () => {
        // 스크롤 위치 저장
        sessionStorage.setItem('scrollPosition', window.pageYOffset+"");
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }; // 언마운트시 발동 
    }, []);

    useEffect(() => {
      const items = JSON.parse(sessionStorage.getItem('items') || '[]');
      const scrollPosition = sessionStorage.getItem('scrollPosition') || 0;
    
      // 아이템 목록 상태 업데이트
      setData(items);
    
      // 스크롤 위치 복원
      window.scrollTo(0, parseInt(scrollPosition+"", 10));
    }, []);
    
    
  


    useEffect(()=> {
      const observer = new IntersectionObserver(
        async (
          entries: IntersectionObserverEntry[],
          observer : IntersectionObserver
        ) => {
          const element = entries[0]
          if (element.isIntersecting && trigger.current ) {
            observer.unobserve(trigger.current);
            console.log(element.isIntersecting);
            setLoading(true);
            const newData:any = await getMoreData(page,user?.id);
            
            if (newData.length !== 0 ) {
              setPage((prev)=> prev + 1);
              setData((prev:any) => [...prev, ...newData]);
            } else {
              setIsLastPage(true);
            }
            setLoading(false);
          }
        } , {
          threshold: 0.1,
        }
      )
      if (trigger.current) {
        observer.observe(trigger.current);
      }
      return () => {
        observer.disconnect();
      }
    },[page])

    
   const handleFetch = async () => {
    if (!user) return
     const response = await fetch(`/api/data?userId=${user?.id}`,{
      method:"GET" 
     })   
      
    }
    useEffect(()=> {
      handleFetch()
    },[])

    const handleLike = (id:number) => {

      setData((prev:any) => {
        const updatedData = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              postLike: !item.postLike,
            };
          }
          return item;
        });
    
        const updatedItem = updatedData.find((item) => item.id === id);
        const likes = updatedItem ? updatedItem.postLike : false;
    
        if (user) {
          debouncedUpdateLike(user.id, likes, id);
        }
    
        return updatedData;
      });
    };
    
    const updateLike = async (id:number,like:boolean,postId:number) => {
       const rsp = await fetch(`/api/users`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({
          userId : id ,
          like : like ,
          postId : postId
        })
       })
       console.log(rsp);
    }

    const debouncedUpdateLike = debounce(updateLike, 500);
    

    

  

  return (
      <div className='flex flex-col justify-center items-center bg-red-200 h-[100%] w-screen'>
          <div onClick={()=>{router.push('/write')}} className='hover:bg-white flex justify-center items-center rounded-full bg-blue-500 fixed bottom-[25px] z-[10] right-[25px] h-[50px] w-[50px]'>
             <FaPencilAlt className='hover:text-black text-white w-[30px] h-[30px]' />
          </div>
          
          <div className='p-2 pr-4 grid gap-[15px] grid-cols-1 md:grid-cols-2 items-center mt-[0px]  h-[auto] max-h-[100%] min-h-[100vh] w-[100%] bg-neutral-200'>
          {
            data.map((e:any)=>{
              return(
                <div  key={e.id} className='flex flex-col justify-center items-center m-[5px] shadow-md  w-[100%] h-[400px] md:h-[500px] ' >
                    <div  className='relative bg-slate-500 w-[100%] h-[60%]'>
                        <Image priority fill className='object-fit w-[100%] h-[100%]' src={`${e.thumbnail}/public`}  alt="" />
                        <span className='top-0 absolute flex items-center p-4 w-[100%] h-[40%] '>
                            <Image alt='' width={50} height={50} src={`${e.user.profile}/avatar`} className='flex justify-center items-center bg-slate-100 rounded-full'/>
                            <div className='m-4 text-white'>{e.user.username}</div>
                            <div className='z-[1000]  m-2 ml-auto'>
                                <FaHeart onClick={()=> {handleLike(e.id)}} className={`w-[30px] h-[30px] z-[1000] ${e.postLike ? "text-yellow-300" : "text-slate-300"}`}/>
                            </div>
                            <div className='text-black h-[20px] w-[20px]'>{e.postLike}</div>
                        </span>
                    </div>
                    <div onClick={()=>{router.push(`/Post/${e.id}`)}} className='bg-white w-[100%] h-[40%]'>
                         <h2 className='m-5 font-bold '>{e.title}</h2>
                         <div className='m-5 h-[60%] break-words overflow-hidden'>
                            {parse(e.body)}
                          </div>
  
                    </div>
                </div>
              )
            })
          }   
          
      
          </div>
          
            { !isLastPage ? 
              <span  className='bg-white h-[1px]' ref={trigger}/> : null
            }
        
      
               
          
      </div>
  )
}

export default Page