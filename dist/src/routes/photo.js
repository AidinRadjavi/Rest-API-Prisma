"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo_controller_1 = require("../controllers/photo.controller");
const basic_auth_1 = require("../middlewares/auth/basic.auth");
const photo_rules_1 = require("../validations/photo.rules");
const router = express_1.default.Router();
//---------------------------------------------------------------------------------------------------------------------------------------
// Post a photo
router.post("/", basic_auth_1.basicAuthorization, photo_rules_1.createPhotoRules, photo_controller_1.newPhoto);
//---------------------------------------------------------------------------------------------------------------------------------------
// Get a photo
router.get("/", basic_auth_1.basicAuthorization, photo_controller_1.showAllPhotos);
//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single photo
router.get("/:photoId", basic_auth_1.basicAuthorization, photo_controller_1.showSinglePhoto);
//---------------------------------------------------------------------------------------------------------------------------------------
// Update a photo
router.patch("/:photoId", basic_auth_1.basicAuthorization, photo_rules_1.updatePhotoRules, photo_controller_1.updateUserPhoto);
//---------------------------------------------------------------------------------------------------------------------------------------
exports.default = router;
