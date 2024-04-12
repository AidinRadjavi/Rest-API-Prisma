"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basic_auth_1 = require("../middlewares/auth/basic.auth");
const album_rules_1 = require("../validations/album.rules");
const album_controller_1 = require("../controllers/album.controller");
const router = express_1.default.Router();
//---------------------------------------------------------------------------------------------------------------------------------------
// Post a album
router.post("/", basic_auth_1.basicAuthorization, album_rules_1.createAlbumRules, album_controller_1.newAlbum);
//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums
router.get("/", basic_auth_1.basicAuthorization, album_controller_1.showAllAlbums);
//---------------------------------------------------------------------------------------------------------------------------------------
// Update a album
router.patch("/:albumId", basic_auth_1.basicAuthorization, album_rules_1.updateAlbumRules, album_controller_1.updateUserAlbum);
//---------------------------------------------------------------------------------------------------------------------------------------
// Add photo to an album
router.post("/:albumId/photos", basic_auth_1.basicAuthorization, album_controller_1.addPhotoToAuthUserAlbum);
//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums
router.get("/:albumId", basic_auth_1.basicAuthorization, album_controller_1.getSingleAlbum);
//---------------------------------------------------------------------------------------------------------------------------------------
exports.default = router;
