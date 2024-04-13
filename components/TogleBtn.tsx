import { useState } from "react";
import { motion } from 'framer-motion';

export default function TogleBtn() {
    const [isOn, setIsOn] = useState(false);
  
    const toggleSwitch = () => setIsOn(!isOn);
return (
    <div className={`${isOn ? "justify-content":""}rounded-xl flex  p-[10px] cursor-pointer border-r-[50px] bg-rgba(255, 255, 255, 0.4) h-[100px] w-[160px] `} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className="w-[80px] h-[80px] bg-white border-r-[40px]"  transition={spring} />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
