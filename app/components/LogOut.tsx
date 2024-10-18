"use client"
import { signOut } from 'next-auth/react';
import React from 'react'
import { RxExit } from "react-icons/rx";

const LogOut = () => {
    const handleLogout = async () => {
        await signOut();
    }

    return (
        <div onClick={handleLogout} className='text-[#5442f6] flex items-center text-sm font-semibold hover:cursor-pointer'><div className='scale-125'>
            <RxExit/>
            </div> <p className='ml-2'>Keluar</p></div>
    )
}

export default LogOut