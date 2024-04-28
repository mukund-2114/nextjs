'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function ProfilePage(){

    const [data, setData] = useState("No Data")
    const router = useRouter();
    const getUserDetails = async()=>{
       try {
         const res = await axios.post('/api/users/me');
         console.log(res.data.data._id)
         setData(res.data.data._id)
       } catch (error:any) {
            console.log(error.message)
       }
    }

    const logout = async()=>{
        try {
            await axios.get('/api/users/logout')
            alert('User logged out')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h1 className="text-xl font-bold">Profile Page</h1>
            <Link href={`/profile/${data}`}>{data}</Link>
            <button className="border rounded border-black p-1" onClick={logout}>Logout</button>
            <button className="border rounded border-black p-1" onClick={getUserDetails}>Get User details</button>
        </div>
    )
}