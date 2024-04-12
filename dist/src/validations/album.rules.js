"use strict";
// Validation rules for photo
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlbumRules = exports.createAlbumRules = void 0;
const express_validator_1 = require("express-validator");
//---------------------------------------------------------------------------------------------------------------------------------------
// Create album
exports.createAlbumRules = [
    (0, express_validator_1.body)("title")
        .isString().withMessage("title has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
    (0, express_validator_1.body)("id")
        .isInt({ min: 1 }).withMessage("has to be a positive integer")
];
//---------------------------------------------------------------------------------------------------------------------------------------
// Update album
exports.updateAlbumRules = [
    (0, express_validator_1.body)("title")
        .isString().withMessage("title has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("title has to be 3-191 characters"),
];
//---------------------------------------------------------------------------------------------------------------------------------------
