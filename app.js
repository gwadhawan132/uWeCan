import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import donationRouter from "./routes/donationRouter.js";
import itemsRouter from "./routes/itemsRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import blogRouter from "./routes/blogRouter.js";
import UserRouter from "./routes/UserRouter.js";
import cors from "cors";    //used to connect the backend to the frontend of application


const app=express();

dotenv.config({path:"./config/config.env"})

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','PUT','POST','DELETE'],
    credentials:true
}))

app.use(cookieParser());    //used in authorization
app.use (express.json());
app.use(express.urlencoded({extended:true})); 

dbConnection();

app.use('/donate',donationRouter);
app.use('/getallitems',itemsRouter);
app.use('/checkout',checkoutRouter);
app.use('/blog',blogRouter);
app.use('/signup',UserRouter);


export default app;