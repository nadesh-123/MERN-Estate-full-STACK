import express from 'express';
import {signup,signin, google,signOut} from "../controller/auth.controller.js"
const routers=express.Router();
routers.post("/signup",signup);
routers.post("/signin",signin);
routers.post('/google',google);
routers.get('/signout',signOut);
export default routers;