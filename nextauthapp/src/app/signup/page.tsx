'use client'
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function SignUpPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const userSignUp =async () => {
        setLoading(true)
        setButtonDisabled(true)
        try {
            const response =await axios.post('/api/users/signup',user);
            toast('Sign Up Success');
            console.log("SignUp successful",response.data)
            setLoading(false)
            setButtonDisabled(false)
            router.push('/login')
        } catch (error) {
            console.log("signup failed", error)
            toast('Sign Up failed');
            setLoading(false)
            setButtonDisabled(false)
        }
    }

    useEffect(() => {
      if(user.username.length > 0 && user.password.length > 0 && user.email.length > 0){
        setButtonDisabled(false)    
      }
    }, [user])
    

    return (
        <div className="text-black min-h-screen flex justify-center items-center">
           <div className="flex flex-col w-min gap-5 bg-white p-4 rounded">
            <h1 className="text-center text-lg font-bold">{loading ? "Processing" : "Sign Up"}</h1>
            <input type="text"
                    value={user.username}
                    className="rounded border-black border p-2"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username" />

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

                {buttonDisabled ? <button className="rounded p-2 bg-black text-white" disabled>Sign Up</button> : 
                <button className="rounded p-2 bg-black text-white" onClick={userSignUp}>Sign Up</button>}
                <Toaster />
           </div>
        </div>
    )
}