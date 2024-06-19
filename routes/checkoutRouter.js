import express from "express";
import {Donation} from "../models/Donation.js";
import mongoose from "mongoose";


const router = express.Router();

router.post('/', async (req, res) => {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty or invalid.' });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        for (const item of cartItems) {
            const { category, itemName, cartQuantity, size, model, expirationDate } = item;

            // Construct the query dynamically
            const query = { category, itemName };

        

            const donationItem = await Donation.findOne(query).session(session);
           
            console.log("Query:", query); // Log the query to see what is being searched

            if (!donationItem) {
                throw new Error(`Item not found: ${itemName} in category ${category}`);
            }

            if (donationItem.quantity < cartQuantity) {
                throw new Error(`Not enough quantity for item: ${itemName}`);
            }

            donationItem.quantity -= cartQuantity;
            await donationItem.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Checkout successful.' });
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
            session.endSession();
        }
        res.status(500).json({ message: error.message });
    }
});

export default router;