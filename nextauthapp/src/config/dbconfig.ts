import mongoose from "mongoose";

export async function dbConnect(){
    try {
        
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("MongoDB connection established")
        })
        
        connection.on('error', (err) =>{
            console.log("MongoDB connection error. Error: " + err)
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong when connecting to Mongo",error);
    }
}