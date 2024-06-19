import express from "express";
import {Donation} from "../models/Donation.js";


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve donations.' });
    }
});

export default router;