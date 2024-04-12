"use strict";
// Authentication helper
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedUsersId = exports.authHeaderValAndExtract = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("src-helper:auth_helper");
const authHeaderValAndExtract = (req, expectedType) => {
    if (!req.headers.authorization) {
        throw new Error("Authorization header missing");
    }
    const [authSchema, payload] = req.headers.authorization.split(" ");
    if (authSchema !== expectedType) {
        throw new Error(`Expected ${expectedType} authentication`);
    }
    return payload;
};
exports.authHeaderValAndExtract = authHeaderValAndExtract;
//---------------------------------------------------------------------------------------------------------------------------------------
// Get id of logged in user
const authenticatedUsersId = (req) => {
    const user = req.user;
    return user ? user.id : null;
};
exports.authenticatedUsersId = authenticatedUsersId;
//---------------------------------------------------------------------------------------------------------------------------------------
