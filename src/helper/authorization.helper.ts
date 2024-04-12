// Authentication helper

import Debug from "debug";
import { Request } from "express";

const debug = Debug("src-helper:auth_helper");

//---------------------------------------------------------------------------------------------------------------------------------------
// http basic auth helper

type AuthenticationType = "Basic" | "Bearer";

export const authHeaderValAndExtract = (req: Request, expectedType: AuthenticationType) => {

	if (!req.headers.authorization) {
		throw new Error("Authorization header missing");
	}

	const [authSchema, payload] = req.headers.authorization.split(" ");

	if (authSchema !== expectedType) {
		throw new Error(`Expected ${expectedType} authentication`);
	}

	return payload;
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Get id of logged in user
export const authenticatedUsersId = (req: Request):
number | null => {
	const user = req.user;
	return user ? user.id : null;
};

//---------------------------------------------------------------------------------------------------------------------------------------
