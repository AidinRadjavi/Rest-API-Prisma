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
exports.getUserProfile = void 0;
//Profile Controller
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("prisma-user:profile.controller");
//---------------------------------------------------------------------------------------------------------------------------------------
// Get a authenticated user
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error("Trying to access autenticated user but there is not any existing ones");
    }
    res.status(200).send({ status: "success", data: {
            id: req.user.id,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name
        }
    });
});
exports.getUserProfile = getUserProfile;
//---------------------------------------------------------------------------------------------------------------------------------------
