import { comments } from "../data"
import { redirect } from "next/navigation";

export async function GET(request: Request, { params }: { params:{id: string }}) {
    if(parseInt(params.id) > comments.length){
        redirect('/comments')
    }
    const comment = comments.find(comment => comment.id === parseInt(params.id))
    return Response.json((comment))
}

export async function PATCH(request: Request, { params }: { params:{id: string }}) {
    const {text} = await request.json();
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));
    comments[index].text = text;
    return Response.json(comments) 
}
export async function DELETE(request: Request, { params }: { params:{id: string }}) {
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));
    const deleteComment = comments[index]
    comments.splice(index,1);
    return Response.json(deleteComment) 
}