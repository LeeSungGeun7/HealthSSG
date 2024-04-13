import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface ModalProps {
    isOpen : boolean
    children : any
    onClick : ()=> void
    setIsModalOpen : any
}
// 모달 오픈 함수 , 모달 닫는 함수 , 부모 access 함수 

const button = "hover:bg-slate-200 hover:text-black m-2 rounded-lg bg-black text-white w-[40px] h-[40px]"


function Modal({isOpen ,setIsModalOpen , children , onClick}:ModalProps) {
    const handleCancel = () => {
        setIsModalOpen(false); 
      };
    if (!isOpen) return <></>
 else return (
        <>
        
        <motion.div onClick={handleCancel} className='left-[0%] top-[0%] opacity-50 bg-slate-400 fixed w-[100vw] h-[100vh]'>
        </motion.div>
        <motion.div className='font-jalnan2 z-[200] shadow-lg rounded-2xl  flex justify-center items-center fixed left-[25%] bottom-[25%] w-[50vw] h-[50vh] bg-slate-300'>
            <AnimatePresence>
                
                <div className='flex justify-center flex-col items-center h-[80%] bg-slate-100 w-full'>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60, scale: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        // making use of framer-motion spring animation
                        // with stiffness = 300
                        transition: {
                            type: "spring",
                            stiffness: 300
                        }
                    }}
                    exit={{
                        opacity: 0, scale: 0.5,
                        transition: { duration: 0.6 }
                    }}>    
                </motion.div>
                <motion.div 
                            initial={{ y: -30, opacity: 0 }}
                            animate={{
                                y: 0, opacity: 1,
                            }}>
                            {/* Modal content is geeksforgeeks image */}
                            <img
                                src=
"https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/7b7966df-259a-408e-8da3-0e7bb5a08a00/avatar"
                                alt="geeksforgeeks"
                                style={{ zIndex: "1" }}
                            />
                        </motion.div>
                        <div>
                            {children}
                        </div>
                        <div className='m-2'>
                            <motion.button 
                             onClick={onClick} className={`${button}`}
                             initial={{ scale: 1 }}
                             whileHover={{ scale: 0.9 }}
                             >확인</motion.button>
                            <motion.button 
                            onClick={handleCancel} 
                            className={`${button}`}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 0.9 }
                            }>취소</motion.button>
                        </div>
                        
                        </div>   
            </AnimatePresence>
        </motion.div> 
        </>  
  )
}

export default Modal