// Validation rules for photo

import { body } from "express-validator";

//---------------------------------------------------------------------------------------------------------------------------------------
// Create album

export const createAlbumRules = [
		body("title")
			.isString().withMessage("title has to be a string").bail()
			.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),

		body("id")
			.isInt({ min: 1 }).withMessage("has to be a positive integer")
];

//---------------------------------------------------------------------------------------------------------------------------------------
// Update album

export const updateAlbumRules = [
	body("title")
		.isString().withMessage("title has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),

];

//---------------------------------------------------------------------------------------------------------------------------------------
