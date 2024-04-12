"use strict";
// Validation Rules for User resource
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUserRules = void 0;
const express_validator_1 = require("express-validator");
const user_services_1 = require("../services/user.services");
//---------------------------------------------------------------------------------------------------------------------------------------
// Create new user
exports.createNewUserRules = [
    (0, express_validator_1.body)("email")
        .trim().isEmail().withMessage("email must be a valid email").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_services_1.getUserFromEmail)(value);
        if (user) {
            throw new Error("Email already exists");
        }
    })),
    (0, express_validator_1.body)("password")
        .isString().withMessage("password must be a string").bail()
        .trim().isLength({ min: 6 }).withMessage("password must have minimum of 6 characters"),
    (0, express_validator_1.body)("first_name")
        .isString().withMessage("first name must be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("first name must be between 3-191 characters long"),
    (0, express_validator_1.body)("last_name")
        .isString().withMessage("last name must be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("last name must be between 3-191 characters long"),
];
//---------------------------------------------------------------------------------------------------------------------------------------
