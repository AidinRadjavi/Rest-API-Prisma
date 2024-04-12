//Profile Controller
import Debug from "debug";
import { Request, Response } from "express";

const debug = Debug("prisma-user:profile.controller");


//---------------------------------------------------------------------------------------------------------------------------------------
// Get a authenticated user

export const getUserProfile = async (req: Request, res: Response) => {

	 if (!req.user) {
	 	throw new Error("Trying to access autenticated user but there is not any existing ones");
	 }

		 res.status(200).send({ status: "success", data: {
			id: req.user.id,
			email: req.user.email,
			first_name: req.user.first_name,
			last_name: req.user.last_name }
		});
};

//---------------------------------------------------------------------------------------------------------------------------------------
