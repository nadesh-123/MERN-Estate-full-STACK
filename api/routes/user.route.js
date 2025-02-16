import express from 'express';
  import { verifyToken } from '../utils/verifyUser.js';
import {test} from "../controller/user.controller.js";

import { updateUser,deleteUser,getUserListings,getUser } from '../controller/user.controller.js';
const router=express.Router();
router.get("/test",test);
router.get("/run",(req,res)=>{
    res.send("run end point");
});
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id', verifyToken, getUser)
 export default router;