'use client'
import React, { useState ,useEffect } from 'react'
import { useDataProviding } from '../provider/DataProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserLogSvg } from './svg/AllSvg';

function AccountButton() {

  const router = useRouter();
    const [userMenu,setUserMenu] = useState(false);
    const [userCloseMenu,setUserCloseMenu] = useState(false);

    const { state, dispatch } = useDataProviding()


    const handleEscape = (e) => {
        if(e.key === 'Esc' || e.key === 'Escape'){
          setUserCloseMenu(false)
          setUserMenu(false)
        }
      }
    
      useEffect(() =>{ //document  funciona solo en el useEfect hook
        document.addEventListener('keydown', handleEscape);
      },[])

    const closeUserMenu = () => {
        setUserCloseMenu(false)
        setUserMenu(false)
    }

    const openMenu = () => {
        setUserMenu(true)
        setUserCloseMenu(true)

        if(userMenu && userCloseMenu){
            setUserCloseMenu(false)
            setUserMenu(false)
        }
      }
    const handleLogOut = () => {

      if (window.confirm("Do you want to log out")) {
        dispatch({
          type:'LOG_OUT',
        })
         setTimeout(() =>{
         }, 3000)
         router.push("/");
         router.refresh();
   }
    }

  return (
    <div className='relative'>
     <button onClick={() =>openMenu()} type="button" className="flex z-10 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
     <UserLogSvg />
   </button>
   <button className={`fixed inset-0 h-full w-full ${!userCloseMenu ? 'hidden':'block'} cursor-default`} onClick={() =>closeUserMenu()} tabIndex="-1"></button>
   {
     userCloseMenu ? 
         <div className="absolute right-2 z-40 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" tabIndex="-1">
             {!state.submitted ? <Link href='/login' className="block hover:text-white hover:bg-blue-500 px-4 py-2 text-sm text-gray-700 w-full">Log In</Link> : <></>}
             {!state.submitted ? <Link href='/register' className="block hover:text-white hover:bg-blue-500 px-4 py-2 text-sm text-gray-700 w-full">Register</Link> : <></>}
             {state.submitted ? <button onClick={() => handleLogOut()} className="block hover:text-white hover:bg-blue-500 px-4 py-2 text-sm text-gray-700 w-full">Log out</button> : <></>}
      </div>
      :
      <></>
   }
   
</div>
  )
}

export default AccountButton