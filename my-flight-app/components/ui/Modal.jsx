'use client'
import {motion, AnimatePresence} from 'framer-motion'

const backdrop = {
  visible: { opacity: 1},
  hidden: { opacity: 0}
}

const modal = {
  visible: { 
    y: 0,
    opacity: 1,
    transition: { delay: 0.2 }
  },
  hidden: { 
    y: "-100vh",
    opacity: 0
  }
}

export default function Modal({isVisibe, onClose, children}) {

    if( !isVisibe ) return null;

    const handleClose = (e) => {
          if( e.target.id === 'wrapper') onClose(false);

    }


  return (
    <AnimatePresence mode="wait">
      {isVisibe &&  
      
           <motion.div id="wrapper" className='fixed inset-0 z-20 bg-black bg-opacity-25
               backdrop-blur-sm flex justify-center items-center'
               onClick={handleClose}
               variants={backdrop}
               initial="hidden"
               animate="visible"
               exit="hidden">
               <motion.div className='w-full md:w-[400px] lg:w-[700px] flex flex-col pt-7 pb-5 sm:pl-4 sm:pr-4'
                 variants={modal}
                 >
                   <div className='p-2 rounded bg-neutral-700'>
                    <div className='flex flex-row-reverse pr-2'>
                      <button className='text-white text-base font-bold place-self-end' onClick={() => onClose(false)}>X</button>
                    </div>
                      
                      {children}
                   </div>
               </motion.div>
           </motion.div>
        }
    </AnimatePresence>
  )
}