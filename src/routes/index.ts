// Main application routes

import express from "express";
import { basicAuthorization } from "../middlewares/auth/basic.auth";
import profileRoutes from "./profile"
import photoRoutes from "./photo"
import albumRoutes from "./album"
import registerRoutes from "./register"

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------------------------------
// GET

router.get("/", (req, res) => {
	res.send({
		message: "Get something",
	});
});

//---------------------------------------------------------------------------------------------------------------------------------------
//Get profile

router.use("/profile", basicAuthorization, profileRoutes);

//---------------------------------------------------------------------------------------------------------------------------------------
// Post Photo

router.use("/photos", basicAuthorization, photoRoutes);

//---------------------------------------------------------------------------------------------------------------------------------------
// Post album

router.use("/albums", albumRoutes);

//---------------------------------------------------------------------------------------------------------------------------------------
// Register user

router.use("/register", registerRoutes);

//---------------------------------------------------------------------------------------------------------------------------------------
//Catch-all route handler

router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

//---------------------------------------------------------------------------------------------------------------------------------------

export default router;
