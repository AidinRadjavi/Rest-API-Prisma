"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const user_services_1 = require("../services/user.services");
const debug = (0, debug_1.default)("prisma-user:register.controller");
//---------------------------------------------------------------------------------------------------------------------------------------
// Register a new user
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationError = (0, express_validator_1.validationResult)(req);
    if (!validationError.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationError.array(),
        });
        return;
    }
    const verifyData = (0, express_validator_1.matchedData)(req);
    const hashed_password = yield bcrypt_1.default.hash(verifyData.password, 10);
    const data = Object.assign(Object.assign({}, verifyData), { password: hashed_password });
    try {
        const user = yield (0, user_services_1.createNewUser)(data);
        res.status(201).send({ status: "success", data: { email: user.email, first_name: user.first_name, last_name: user.last_name } });
    }
    catch (err) {
        debug("Error when trying to create a new user: %O", err);
        return res.status(500).send({ status: "error", message: "Could not create user in database" });
    }
});
exports.registerNewUser = registerNewUser;
//---------------------------------------------------------------------------------------------------------------------------------------
