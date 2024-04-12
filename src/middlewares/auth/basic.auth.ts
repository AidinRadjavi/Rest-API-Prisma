//HTTP Basic Authentication Middleware

import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserFromEmail } from "../../services/user.services";
import { authHeaderValAndExtract } from "../../helper/authorization.helper";

const debug = Debug("prisma-user:basic");

//---------------------------------------------------------------------------------------------------------------------------------------
// http basic authentication

export const basicAuthorization = async (req: Request, res: Response, next: NextFunction) => {

	let base64Payload: string;

	try {
		base64Payload = authHeaderValAndExtract(req, "Basic");
	} catch (err) {
		if (err instanceof Error) {
			return res.status(401).send({ status: "fail", message: err.message });
		}
		return res.status(401).send({ status: "fail", message: "Unknown error when trying to authorize" });
	}

	const payloadDecode = Buffer.from(base64Payload, "base64").toString("ascii");

	const [email, password] = payloadDecode.split(":");

	if (!email || !password) {
		debug("User has not sent either email or password");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	const user = await getUserFromEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	const password_correct = await bcrypt.compare(password, user.password);
	if (!password_correct) {
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	req.user = user;

	next();
}
//---------------------------------------------------------------------------------------------------------------------------------------
