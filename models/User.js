import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, required: true },
    signupDate: { type: Date, default: Date.now }, // Add signupDate with default value as current date/time

  });
  
 export const User = mongoose.model('User', userSchema);
  
