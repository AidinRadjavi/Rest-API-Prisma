"use strict";
// Validation rules for photo
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhotoRules = exports.createPhotoRules = void 0;
const express_validator_1 = require("express-validator");
//---------------------------------------------------------------------------------------------------------------------------------------
// Create Photo
exports.createPhotoRules = [
    (0, express_validator_1.body)("title")
        .isString().withMessage("title has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
    (0, express_validator_1.body)("url")
        .isURL().withMessage("url has to be a string and valid url link").bail()
        .trim(),
    (0, express_validator_1.body)("comment")
        .optional()
        .isString().withMessage("comment has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("comment has to be minimum of 3 characters long"),
];
//---------------------------------------------------------------------------------------------------------------------------------------
// Update photo
exports.updatePhotoRules = [
    (0, express_validator_1.body)("title")
        .isString().withMessage("title has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
    (0, express_validator_1.body)("url")
        .isURL().withMessage("url has to be a string and valid url link").bail()
        .trim(),
    (0, express_validator_1.body)("comment")
        .optional()
        .isString().withMessage("comment has to be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("comment has to be minimum of 3 characters long"),
];
//---------------------------------------------------------------------------------------------------------------------------------------
