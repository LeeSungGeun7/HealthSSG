"use client"
import Dots from '@/components/Main/Dots';
import Item from '@/components/Main/Item';
import React, { useCallback, useState , useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { slideAtom } from '@/states/slideAtom';
import TextAnim from '@/components/Main/TextAni';
import Image from 'next/image';
import Section from '@/components/Section/Section';
import img1 from "@/public/images/IphoneFrame.png"
import { AnimatePresence, motion } from 'framer-motion';
const inner = "flex h-[100vh]  justify-center items-center text-lg"



export default function Home() {
  const DIVIDER_HEIGHT = 5 ;
  const outerDivRef:any = useRef();
  const [page , setPage] = useRecoilState(slideAtom);
  const [sectionHeights, setSectionHeights] = useState([]);
  const images = ["https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/1d666bde-3b19-48e1-e3c6-18227a5a4800/public","https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/8344ca1a-00a4-4de0-dc77-eb166f361d00/public","https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/6d922ce6-d581-4e69-57ec-badc0b0e7d00/avatar"]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3초마다 이미지 전환

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  useEffect(() => {
    const sectionHeights:any = [
      window.innerHeight,
      window.innerHeight * 2 + DIVIDER_HEIGHT,
      window.innerHeight * 3 + DIVIDER_HEIGHT * 2,
      window.innerHeight * 4 + DIVIDER_HEIGHT * 3,
      window.innerHeight * 5 + DIVIDER_HEIGHT * 4,
      window.innerHeight * 6 + DIVIDER_HEIGHT * 5,
    ];
    setSectionHeights(sectionHeights);
    
    const savedPage = Number(localStorage.getItem('memo'));
    localStorage.removeItem('memo');
    if (savedPage) {
      setPage(savedPage);
      outerDivRef.current.scrollTo({
        top: page === 1 ? 0 : sectionHeights[page - 2],
        left: 0,
        behavior: "smooth",
      });
      window.scrollTo(0, sectionHeights[savedPage - 1]);
    } 
    return () => {
      localStorage.setItem('memo' , page+"");
    }

  }, []);


  useEffect(() => {
    const wheelHandler = (e:any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;
  
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setPage(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setPage(4);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setPage(5);
        } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
          // 현재 5페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 5,
            left: 0,
            behavior: "smooth",
          });
          setPage(6);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setPage(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setPage(2);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setPage(3);
        } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
          // 현재 5페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setPage(4);
        } else {
          // 현재 6페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setPage(5);
        }
      }
    };
  
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
  
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

    
  useEffect(() => {
    if (page > 0 && page <= sectionHeights.length) {
      outerDivRef.current.scrollTo({
        top: page === 1 ? 0 : sectionHeights[page - 2],
        left: 0,
        behavior: "smooth",
      });
    }

  }, [page]);


  // useEffect(()=> {
  //   const pageHeight = window.innerHeight;
  //   if (page == 1) {
  //     outerDivRef.current.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  //   if (page == 2) {
  //     outerDivRef.current.scrollTo({
  //       top: pageHeight + DIVIDER_HEIGHT,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  //   if (page == 3) {
  //     outerDivRef.current.scrollTo({
  //       top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // },[page])

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2, // 자식 요소들 간의 애니메이션 간격 (초 단위)
      },
    },
  };
  
  const childVariants = {
    initial: { opacity: 0, rotate: 30 , y: -70 , x: 30 },
    animate: { opacity: 1, rotate: 0, y: 0 , x:0 },
  };
  

  return(
    <div ref={outerDivRef}
     className='snap-y snap-mandatory scroll-y overflow-y-scroll h-[100vh] bg-#D0CFCE '>
        <div className={`${page ==2 ? "text-white" : "text-black"} fixed sm:left-[80px] z-[1000] left-[20px] top-7 font-jalnan2`}>{page==3 && "Project"}{page==2 && "Skills"}{page==4 && "Recently Post"}</div>
        <Dots num={null} currentPage={page}/>
        <div className={`${inner} bg-#D0CFCE`}>
            <div className='flex flex-col  text-[30px] font-jalnan2  text-white flex-start bg-#D0CFCE h-[80%] w-[80%]'>
                <TextAnim>
                  FRONT END DEV 
                </TextAnim>
                <div className='bg-white w-full h-[100%]'>
                    <div className='relative text-black bg-#D0CFCE w-full h-[100%]'>
                        <div className='left-[-76%] sm:left-[-100px] flex justify-center items-center relative h-[100%] w-[250%] sm:w-[100%] '>
                          <Image className='sm:h-[100%] sm:w-[100%] absolute top-0 h-[100%] w-[100%] ' width={500} height={500} quality={100} src={img1} alt=""/>
                          
                          <motion.div
        variants={containerVariants}                          
        initial="initial"
        animate="animate"
        className="absolute rounded-3xl top-[95px] h-[69%] w-[32%]"
      >
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            variants={childVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              width={480}
              height={300}
              src={images[currentImageIndex]}
              alt=""
              className="w-full h-full rounded-3xl"
            />
          </motion.div>
        </AnimatePresence>
        </motion.div>
                        </div>
                        <div className='hidden bottom-10 w-[100%] absolute sm:right-0 sm:block sm:top-20 sm:w-[40%]'>
                          안녕하세요
                          
                          </div>
                        
                    </div>
                    <div className='w-full h-[0%] bg-blue-200'>
                        <div className='p-[10px] text-[25px]'>
                          
                          <p className=' text-[15px]'></p>
                          <p></p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="h-[5px] w-full"></div>
        <Section num={2}/>
        <div className="h-[5px] w-full"></div>
        <Section num={3}/>
        <div className="h-[5px] w-full"></div>
        <div className={`${inner} bg-white`}>
            <div className='w-[100%] shadow-xl h-[100%] bg-white'>
                <Section num={4}/>
            </div>
          
          
          </div>
        <div className="h-[5px] w-full"></div>
        <div className={`${inner} bg-blue-300`}>
          <Item/>
        </div>
      
    </div>

  )
}


