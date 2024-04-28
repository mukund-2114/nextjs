export default function ProfilePage({params}:any){
    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h1 className="text-xl font-bold">Profile Page</h1>
            <h2 className="bg-green-300 text-black">{params.id}</h2>
        </div>
    )
}