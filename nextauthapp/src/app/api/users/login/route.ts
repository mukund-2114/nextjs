import { dbConnect } from "@/config/dbconfig";
import User from "@/models/Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

dbConnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({ error: "User does not exists" }, {status:500})
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({ error: "Password is incorrect" }, {status:400})
        }
        const tokenData = {
            id:user._id,
            username:user.username,
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn:"1h"})
        const response = NextResponse.json({
            message:"User Logged in successfully",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;


    }
    catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:500});
    }
}