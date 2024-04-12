"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = require("../controllers/register.controller");
const request_validations_1 = __importDefault(require("../middlewares/request.validations"));
const user_rules_1 = require("../validations/user.rules");
const router = express_1.default.Router();
//---------------------------------------------------------------------------------------------------------------------------------------
// Register new user
router.post("/", user_rules_1.createNewUserRules, request_validations_1.default, register_controller_1.registerNewUser);
//---------------------------------------------------------------------------------------------------------------------------------------
exports.default = router;
