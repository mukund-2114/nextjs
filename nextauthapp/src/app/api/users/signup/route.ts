import { dbConnect } from "@/config/dbconfig";
import User from "@/models/Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        const user = await User.findOne({email});
 
        if(user){
            return NextResponse.json({message: "User already exists"},{status:400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({username, email, password: hashedPassword})
        const savedUser = await newUser.save();
        console.log(savedUser);
        await sendEmail({email, emailType:"VERIFY",userId: savedUser._id})
        return NextResponse.json({message:"User Registered successfully",success:true,savedUser},{status:200})

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:500});
    }
}


export async function GET(){
    return NextResponse.json({message:"Get Request Working"})
}