"use strict";
// Main application routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basic_auth_1 = require("../middlewares/auth/basic.auth");
const profile_1 = __importDefault(require("./profile"));
const photo_1 = __importDefault(require("./photo"));
const album_1 = __importDefault(require("./album"));
const register_1 = __importDefault(require("./register"));
const router = express_1.default.Router();
//---------------------------------------------------------------------------------------------------------------------------------------
// GET
router.get("/", (req, res) => {
    res.send({
        message: "Get something",
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------
//Get profile
router.use("/profile", basic_auth_1.basicAuthorization, profile_1.default);
//---------------------------------------------------------------------------------------------------------------------------------------
// Post Photo
router.use("/photos", basic_auth_1.basicAuthorization, photo_1.default);
//---------------------------------------------------------------------------------------------------------------------------------------
// Post album
router.use("/albums", album_1.default);
//---------------------------------------------------------------------------------------------------------------------------------------
// Register user
router.use("/register", register_1.default);
//---------------------------------------------------------------------------------------------------------------------------------------
//Catch-all route handler
router.use((req, res) => {
    // Respond with 404 and a message in JSON-format
    res.status(404).send({
        message: "Not Found",
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------
exports.default = router;
