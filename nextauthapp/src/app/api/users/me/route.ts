import { dbConnect } from "@/config/dbconfig";
import User from "@/models/Model";
import { NextRequest, NextResponse } from "next/server";

import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";

dbConnect();

export async function POST(request: NextRequest){
    try {
        const userId = getUserDataFromToken(request);
        // console.log(userId)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({"message":"User Found","success": true,"data":user})
    }
    catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:500});
    }
}