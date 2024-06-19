import express from 'express';
import {User} from '../models/User.js';

const router = express.Router();

 router.post('/', async (req, res) => {
        const { name, address, phoneNumber, userType } = req.body;
      
        try {
          // Check if a user with the same address and phone number signed up within the last 48 hours
          const existingUser = await User.findOne({ address, phoneNumber }).sort({ signupDate: -1 });
          
          if (existingUser) {
            const now = new Date();
            const signupDate = new Date(existingUser.signupDate);
            const hoursDifference = Math.abs(now - signupDate) / 36e5;
      
            if (hoursDifference < 48) {
              const remainingHours = 48 - hoursDifference;
              return res.status(400).json({ message: `You have to wait ${remainingHours.toFixed(2)} hours before signing up again due to a cooldown period of 2 days.` });
            }
          }
      
          // Create a new user
          const newUser = new User({ name, address, phoneNumber, userType });
          await newUser.save();
      
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error creating user', error: error.message });
        }
      });
      

export default router;
