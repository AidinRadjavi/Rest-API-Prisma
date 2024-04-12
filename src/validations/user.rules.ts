// Validation Rules for User resource

import { body } from "express-validator";
import { getUserFromEmail } from "../services/user.services";

//---------------------------------------------------------------------------------------------------------------------------------------
// Create new user

export const createNewUserRules = [
	body("email")
		.trim().isEmail().withMessage("email must be a valid email").bail()
		.custom(async (value) => {

			const user = await getUserFromEmail(value);

			if (user) {
				throw new Error("Email already exists");
			}
		}),

	body("password")
		.isString().withMessage("password must be a string").bail()
		.trim().isLength({ min: 6 }).withMessage("password must have minimum of 6 characters"),

	body("first_name")
		.isString().withMessage("first name must be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("first name must be between 3-191 characters long"),

	body("last_name")
		.isString().withMessage("last name must be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("last name must be between 3-191 characters long"),
];

//---------------------------------------------------------------------------------------------------------------------------------------
