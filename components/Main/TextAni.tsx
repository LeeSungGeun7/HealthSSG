"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import CursorBlinker from "./CursorBlinker";


export default function TextAnim({children}:any) {
  const baseText = children+"" as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <span className="w-full ">
      <motion.span className="text-black">{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
