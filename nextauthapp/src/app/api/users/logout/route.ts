import { dbConnect } from "@/config/dbconfig";
import User from "@/models/Model";
import { NextRequest, NextResponse } from "next/server";


dbConnect();

export async function GET(request: NextRequest){
    try {
        const response = NextResponse.json({
            message:"User Logged out successfully",
            success:true,
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })
        return response

        


    }
    catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:500});
    }
}