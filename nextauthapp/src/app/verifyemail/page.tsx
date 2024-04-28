'use client';
import axios from "axios";
import { useSearchParams ,useRouter} from "next/navigation";
import { useEffect, useState } from "react"

export default function VerifyEmail(){
    
    const searchParams = useSearchParams()
    
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
    const searchToken = searchParams.get('token')
      setToken(searchToken!)
    }, [])
    
    const verifyUser  = async()=>{
        try {
        
        await axios.post('/api/users/verifyemail',{token})
        alert('Email verified successfully')
        router.push('/login');
            
        } catch (error:any) {
            setError(error.response.data.message)
            console.log()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-xl font-bold">Verify Email</h1>
            <p className="bg-orange-300">{token}</p>
            <p>{error}</p>
            <button className="border rounded border-black px-3" onClick={verifyUser}>Verify</button>
        </div>
    )
}