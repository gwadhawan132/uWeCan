import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['medicines', 'clothes', 'medical tools']
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size:{
        type:String,
        default:'NA'
    },
    expirationDate:{
        type:Date,
        default:null
    },
    model:{
        type:String,
        default:'NA'
    }

});

export const Donation = mongoose.model('Donation', donationSchema);

