import mongoose from "mongoose";

export const dbConnection=async()=>{
    
 try{
    const {connection}=await mongoose.connect(
 )

 if(connection){
    console.log(`connected to database : ${connection.host}`);
 }
}catch(e){
    console.log(e);
}
};
