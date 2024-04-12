// Validation rules for photo

import { body } from "express-validator";

//---------------------------------------------------------------------------------------------------------------------------------------
// Create Photo

export const createPhotoRules = [
		body("title")
			.isString().withMessage("title has to be a string").bail()
			.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),

		body("url")
			.isURL().withMessage("url has to be a string and valid url link").bail()
			.trim(),

		body("comment")
			.optional()
			.isString().withMessage("comment has to be a string").bail()
			.trim().isLength({ min: 3 }).withMessage("comment has to be minimum of 3 characters long"),
];

//---------------------------------------------------------------------------------------------------------------------------------------
// Update photo

export const updatePhotoRules = [
		body("title")
			.isString().withMessage("title has to be a string").bail()
			.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),

		body("url")
			.isURL().withMessage("url has to be a string and valid url link").bail()
			.trim(),

		body("comment")
			.optional()
			.isString().withMessage("comment has to be a string").bail()
			.trim().isLength({ min: 3 }).withMessage("comment has to be minimum of 3 characters long"),
];

//---------------------------------------------------------------------------------------------------------------------------------------
