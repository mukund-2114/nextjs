import { dbConnect } from "@/config/dbconfig";
import User from "@/models/Model";

import { NextRequest, NextResponse } from "next/server";


dbConnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt: Date.now()}})
        if(!user){
            return Response.json({ message:"Invalid Token or User already verified"},{status:400})
        }

        user.isVerified  = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save();

        return Response.json({message:"User verified successfully", success: true},{status: 200});  
    } catch (error:any) {
        return Response.json({ error: error.meesage},{status:500})
    }
}

export async function GET(request: NextRequest){
    return Response.json({message:"true"})
}