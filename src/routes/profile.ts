import express from "express";
import { getUserProfile } from "../controllers/profile.controller";

const router = express.Router();


//---------------------------------------------------------------------------------------------------------------------------------------
//Get a user

 router.get("/", getUserProfile);

//---------------------------------------------------------------------------------------------------------------------------------------

export default router;
