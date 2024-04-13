import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";



// animation
const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -100 : 100,
    opacity: 0,
    scale: 0
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7 }
  },
  exit: (back: boolean) => ({
    x: back ? 100 : -100,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.4 }
  })
};

function ETA({children , visible}:any) {
    if (visible == 0) {
        return (
        
            // <div className="flex items-center flex-col justify-center    w-full ">
            //     {children}
            //     <div className="h-[90%] w-full ">
            //         <p className="h-[60%] text-[14px]">개인용 블로그 제작 저만의 이야기를 담아 앞으로의 커리어를 정리하기 위해 제작 되었습니다. </p> 
            //         <p className="text-[15px]]">주요기능 - 게시물 </p>
            //         <p className="text-[15px]">1인 제작 3/1 ~ 3/30</p>    
            //         <p className="text-[12px]">stack - Next.js 14 , React , TypeScript, Tailwind Css  </p>
            //     </div>
            // </div>
            <div className="flex items-center flex-col justify-center  w-full ">
                {children}
            </div>
        )
    } else if (visible == 1) {
        return (
            <div className="flex items-center flex-col justify-center  w-full ">
            {children}
            {/* <div className="h-[90%] w-full ">
                <p className="h-[60%] text-[14px]">사용자의 위치기반 소셜 미디어 </p> 
                <p>주요 역할 </p>
                <p>*  </p>
                
                
                <p className="text-[15px]]">주요기능 - 소셜 </p>
                <p className="text-[15px]">5인 제작 2023-05 ~ 2023-8</p>    
                <p className="text-[12px]">stack -  React , JavaScript , Styled-Component , Java , Spring Boot </p>
            </div> */}
        </div>
        )
    } else if (visible == 2 ) {
        return (
            <div className="flex items-center flex-col justify-center  w-full ">
                {children}
                
                {/* <div className="h-[90%] w-full ">
                    <p className="h-[auto] text-[14px]">공공데이터를 활용해 전기차 충전소 위치 및 정보 제공사이트 </p> 
                    <p className="text-[15px]]">주요기능 - 전기차 충전소 데이터 활용</p>
                    <p className="text-[15px]">1인 제작 3/1 ~ 3/30</p>    
                    <p className="text-[12px]">stack -  React , JavaScrpit , Styled-component , Java , Spring boot   </p>
                </div> */}
            </div>
        )
    } else {
        return (<></>)
    }
    
}


// render
function Slider() {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  const images = ["https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/5f592035-a4f9-43ae-2054-8443bb45c400/public","https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/08554969-25e1-43c0-56f9-a41deba3ed00/public","https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/b7d30ba5-ee6c-4008-4997-82fed2ce1500/public"]  

  const nextPlease = () => {
    setBack(false);
    setVisible((prev) =>
      prev === images.length - 1 ? images.length - 1 : prev + 1
    );
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <motion.div className="flex flex-col  w-[100%] h-[100%] justify-center items-center ">
      <motion.div className="  flex items-center flex-col justify-center h-[90%] w-[100%]">
        <AnimatePresence custom={back}>
          <motion.img
            src={images[visible]}
            className="flex   h-[100%] w-[100%] sm:w-[100%]"
            custom={back}
            variants={boxVariants}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          />
          <div className="flex h-[50%] w-[100%] sm:w-[100%] sm:h-[80%]">
            {visible == 0 && <ETA visible={visible}>포트폴리오 사이트 (개인블로그 및 미니블로그)</ETA>}
            { visible == 1 && <ETA visible={visible}>스팟플로우 (위치 기반 소셜미디어)</ETA>}
            { visible == 2 && <ETA visible={visible}>에코프렌즈 (전기차 충전소 위치)</ETA>}
          </div>
        </AnimatePresence>
      </motion.div>
      <div className="flex justify-center h-auto w-full">
        <button className="m-4" onClick={prevPlease}>{"<"}</button>
        <button onClick={nextPlease}>{">"}</button>
      </div>
     
    </motion.div>
  );
}

export default Slider;
