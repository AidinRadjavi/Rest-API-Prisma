import express from "express";
import { basicAuthorization } from "../middlewares/auth/basic.auth";
import { createAlbumRules, updateAlbumRules } from "../validations/album.rules";
import { addPhotoToAuthUserAlbum, getSingleAlbum, newAlbum, showAllAlbums, updateUserAlbum } from "../controllers/album.controller";

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------------------------------
// Post a album

router.post("/", basicAuthorization, createAlbumRules, newAlbum);

//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums

router.get("/", basicAuthorization, showAllAlbums);

//---------------------------------------------------------------------------------------------------------------------------------------
// Update a album

router.patch("/:albumId", basicAuthorization, updateAlbumRules, updateUserAlbum);

//---------------------------------------------------------------------------------------------------------------------------------------
// Add photo to an album

router.post("/:albumId/photos", basicAuthorization, addPhotoToAuthUserAlbum);

//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums

router.get("/:albumId", basicAuthorization, getSingleAlbum);

//---------------------------------------------------------------------------------------------------------------------------------------

export default router;
