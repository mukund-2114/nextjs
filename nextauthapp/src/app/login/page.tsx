'use client'
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const userSignUp =async () => {
        setLoading(true)
        setButtonDisabled(true)
        try {
            const response =await axios.post('/api/users/login',user);
            toast('Login Successful');
            console.log("Login successful",response.data)
            setLoading(false)
            setButtonDisabled(false)
            router.push('/profile')
        } catch (error) {
            console.log("login failed", error)
            toast('Login Up failed');
            setLoading(false)
            setButtonDisabled(false)
        }
    }

    useEffect(() => {
      if(user.password.length > 0 && user.email.length > 0){
        setButtonDisabled(false)    
      }
    }, [user])
    

    return (
        <div className="text-black min-h-screen flex justify-center items-center">
           <div className="flex flex-col w-min gap-5 bg-white p-4 rounded">
            <h1 className="text-center text-lg font-bold">{loading ? "Processing" : "Login"}</h1>
            
                <input type="email"
                    value={user.email}
                    className="rounded border-black border p-2"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email" />

                <input type="password"
                    value={user.password}
                    className="rounded border-black border p-2"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password" />

                {buttonDisabled ? <button className="rounded p-2 bg-black text-white" disabled>No Login</button> : 
                <button className="rounded p-2 bg-black text-white" onClick={userSignUp}>Login</button>}
                <Toaster />
           </div>
        </div>
    )
}