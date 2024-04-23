import { comments } from "@/app/comments/data";
import { headers, cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    const requestheaders = new Headers(request.headers);
    const headerList = headers();

    const cookieList = cookies().set("ViewsPerPage","25")

    const reqcookies= request.cookies.get('theme');
    console.log(reqcookies);
    console.log(cookies().get('ViewsPerPage'));

    console.log(headerList.get('Authorization'));
    console.log(requestheaders.get('Authorization'));
    return new Response("<h1>Profile api data</h1>",{
        headers:{
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark"
        },
    })
}
