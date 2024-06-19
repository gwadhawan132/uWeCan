import express from "express";
import {Donation} from "../models/Donation.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { category, itemName, quantity } = req.body;

    // Validate request data
    if (!category || !itemName || !quantity) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create a new donation document
        const existingDonation = await Donation.findOneAndUpdate(
            { category, itemName }, // Query to find the item
            { $inc: { quantity } },  // Update to increment the quantity
            { new: true, upsert: true } // Options: return the updated document or insert a new one if it doesn't exist
        );

        res.status(200).json({ message: 'Donation received successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save donation.' });
    }
});



router.post('/bulk',async(req,res)=>{
    const donations = req.body.donations;

    if (!Array.isArray(donations)) {
        return res.status(400).json({ message: 'Donations must be an array' });
    }

    const formattedDonations = donations.map(donation => ({
        category: donation.category,
        itemName: donation.itemName,
        quantity: donation.quantity,
        size: donation.size || 'NA',
        expirationDate: donation.expirationDate || null,
        model: donation.model || 'NA'
    }));

    try {
        const savedDonations = await Donation.insertMany(formattedDonations);
        res.status(200).json(savedDonations);
    } catch (error) {
        res.status(500).json({ message: 'Error saving donations', error });
    }
})

export default router;