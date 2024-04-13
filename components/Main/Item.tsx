"use client"
import { motion } from 'framer-motion'
import React from 'react'

function Item() {
  return (
    <motion.div
            className='font-jalnan2 flex flex-col justify-center items-center'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 2,
                y: { duration: 1 },
            }}
        >
            <div className='sm:text-[90px] text-[50px]'>
                Thank you
            </div>
                <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: "easeInOut",
                        duration: 2,
                        y: { duration: 1 },
                    }}
                >
                    <div className='p-10 text-white'>For Watch XD</div>
                </motion.div>
        </motion.div>
  )
}

export default Item