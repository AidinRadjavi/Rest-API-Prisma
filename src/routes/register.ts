import express from "express";
import { registerNewUser } from "../controllers/register.controller";
import validateRequest from "../middlewares/request.validations";
import { createNewUserRules } from "../validations/user.rules";

const router = express.Router();


//---------------------------------------------------------------------------------------------------------------------------------------
// Register new user

router.post("/", createNewUserRules, validateRequest, registerNewUser);

//---------------------------------------------------------------------------------------------------------------------------------------

export default router;
