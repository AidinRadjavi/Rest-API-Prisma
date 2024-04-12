import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { createNewUser } from "../services/user.services";
import { createNewUserType } from "../types/user.types";

const debug = Debug("prisma-user:register.controller");

//---------------------------------------------------------------------------------------------------------------------------------------
// Register a new user

export const registerNewUser = async (req: Request, res: Response) => {
	const validationError = validationResult(req);
	if (!validationError.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationError.array(),
		});
		return;
	}

	const verifyData = matchedData(req);

	const hashed_password = await bcrypt.hash(verifyData.password, 10);

	const data = {
		...verifyData,
		password: hashed_password,
	} as createNewUserType;

	try {
		const user = await createNewUser(data);
		res.status(201).send({ status: "success", data: {email: user.email, first_name: user.first_name, last_name: user.last_name } });

	} catch (err) {
		debug("Error when trying to create a new user: %O", err);
		return res.status(500).send({ status: "error", message: "Could not create user in database" });
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
