import mongoose from 'mongoose';
export const connect = async ()=>{
  try{
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connected to database");
  }catch(error){
    console.log("DATABASE_CONNECTION_FAILED");
    console.log(error);
  }
}