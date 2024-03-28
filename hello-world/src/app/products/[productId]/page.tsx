export default function ProductDetails({params}:{
    params:{productId:string}
}){
    return(
        <>
            <h2>Product {params.productId}</h2>
        </>
    )
}