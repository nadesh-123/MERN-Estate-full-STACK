import express from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const __dirname=path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

//const mongo=process.env.MONGO;
//console.log(mongo);

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("connected")
  app.listen(3000, () => {
    console.log("Listening on port 3000");
    
  });
}).catch((err)=>{
  console.log("db not connected");
  console.log(err);
});
app.get("/",(req,res)=>{
  res.send("/ end point");
})

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message ||'inernal server error';
  return res.status(statusCode).json({
    success:false,
    statusCode:statusCode,
    message:message,
  });
});