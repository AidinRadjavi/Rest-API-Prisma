import { User } from "@prisma/client";
import { httpBasicAuth } from "../token.types";

declare global {
	namespace Express {
		export interface Request {
			token?: httpBasicAuth
			user?: User
		}
	}
};
