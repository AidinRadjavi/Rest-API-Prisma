import express from "express";
import { newPhoto, showAllPhotos, showSinglePhoto, updateUserPhoto } from "../controllers/photo.controller";
import { basicAuthorization } from "../middlewares/auth/basic.auth";
import { createPhotoRules, updatePhotoRules } from "../validations/photo.rules";

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------------------------------
// Post a photo
router.post("/", basicAuthorization, createPhotoRules, newPhoto);

//---------------------------------------------------------------------------------------------------------------------------------------
// Get a photo

router.get("/", basicAuthorization, showAllPhotos);

//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single photo

router.get("/:photoId", basicAuthorization, showSinglePhoto);

//---------------------------------------------------------------------------------------------------------------------------------------
// Update a photo

router.patch("/:photoId", basicAuthorization, updatePhotoRules, updateUserPhoto);

//---------------------------------------------------------------------------------------------------------------------------------------

export default router;
