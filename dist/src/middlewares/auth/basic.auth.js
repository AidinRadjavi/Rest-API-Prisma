"use strict";
//HTTP Basic Authentication Middleware
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
exports.basicAuthorization = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const user_services_1 = require("../../services/user.services");
const authorization_helper_1 = require("../../helper/authorization.helper");
const debug = (0, debug_1.default)("prisma-user:basic");
//---------------------------------------------------------------------------------------------------------------------------------------
// http basic authentication
const basicAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let base64Payload;
    try {
        base64Payload = (0, authorization_helper_1.authHeaderValAndExtract)(req, "Basic");
    }
    catch (err) {
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
    const user = yield (0, user_services_1.getUserFromEmail)(email);
    if (!user) {
        debug("User %s does not exist", email);
        return res.status(401).send({ status: "fail", message: "Authorization required" });
    }
    const password_correct = yield bcrypt_1.default.compare(password, user.password);
    if (!password_correct) {
        return res.status(401).send({ status: "fail", message: "Authorization required" });
    }
    req.user = user;
    next();
});
exports.basicAuthorization = basicAuthorization;
//---------------------------------------------------------------------------------------------------------------------------------------
