"use client"
import { signOut } from 'next-auth/react';
import React from 'react'

const LogOut = () => {
    const handleLogout = async () => {
        await signOut();
    }

    return (
        <span onClick={handleLogout}>LogOut</span>
    )
}

export default LogOut