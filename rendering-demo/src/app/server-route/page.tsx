import serverFunction from "@/utils/server-utils"

export default function ServerPage(){
    const result = serverFunction();
    return (
    <>
        <h1>Server Route Page</h1>  
        {result}
    </>
    )
}