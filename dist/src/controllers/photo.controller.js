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
exports.updateUserPhoto = exports.showSinglePhoto = exports.showAllPhotos = exports.newPhoto = void 0;
const express_validator_1 = require("express-validator");
const debug_1 = __importDefault(require("debug"));
const photo_services_1 = require("../services/photo.services");
const authorization_helper_1 = require("../helper/authorization.helper");
const debug = (0, debug_1.default)("prisma-photo:photo.controller");
//---------------------------------------------------------------------------------------------------------------------------------------
// Create a photo
const newPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = (0, express_validator_1.matchedData)(req);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    if (!validatedData.url) {
        return res.status(400).send({
            status: "fail",
            message: "URL is a required field."
        });
    }
    if (!validatedData.title) {
        return res.status(400).send({
            status: "fail",
            message: "Title is a required field."
        });
    }
    try {
        const photo = yield (0, photo_services_1.createPhoto)(Object.assign(Object.assign({}, validatedData), { userId }));
        res.status(201).send({ status: "success", data: {
                title: photo.title,
                url: photo.url,
                comment: photo.comment,
                userId: userId,
                id: photo.id
            }
        });
    }
    catch (err) {
        debug("Error when creating a new Photo: %O", err);
        res.status(500).send({ status: "error", message: "Something went wrong when creating the photo in the database" });
    }
});
exports.newPhoto = newPhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
// Get all photos
const showAllPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = (0, express_validator_1.matchedData)(req);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const photo = yield (0, photo_services_1.getAllPhotos)(validatedData);
        const filteredPhotos = photo.filter(photo => photo.userId === userId);
        const formattedPhotos = filteredPhotos.map(photo => ({
            id: photo.id,
            title: photo.title,
            url: photo.url,
            comment: photo.comment
        }));
        res.status(200).send({ status: "success", data: formattedPhotos });
    }
    catch (err) {
        debug("Error when trying to query for all Photos: %O", err);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
});
exports.showAllPhotos = showAllPhotos;
//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single photo
const showSinglePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const photoId = Number(req.params.photoId);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const photo = yield (0, photo_services_1.getSinglePhoto)(photoId);
        if (photo.userId !== userId) {
            return res.status(403).send({ status: "fail", message: "You are not authorized to view this photo" });
        }
        const formattedPhoto = {
            id: photo.id,
            title: photo.title,
            url: photo.url,
            comment: photo.comment
        };
        res.status(200).send({ status: "success", data: formattedPhoto });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Photo Not Found" });
        }
        else {
            debug("Error when trying to query for Photo with ID %d: %O", photoId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
});
exports.showSinglePhoto = showSinglePhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
// Update a photo
const updateUserPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    const photoId = Number(req.params.photoId);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const validatedData = (0, express_validator_1.matchedData)(req);
        const photo = yield (0, photo_services_1.updatePhoto)(photoId, validatedData);
        if (!photo) {
            return res.status(404).send({
                status: "fail",
                message: "Photo Not Found"
            });
        }
        if (photo.userId !== userId) {
            return res.status(403).send({
                status: "fail",
                message: "You are not authorized to update this photo"
            });
        }
        if (!validatedData.url) {
            return res.status(400).send({
                status: "fail",
                message: "URL is a required field."
            });
        }
        if (!validatedData.title) {
            return res.status(400).send({
                status: "fail",
                message: "Title is a required field."
            });
        }
        const formattedPhoto = {
            title: photo.title,
            url: photo.url,
            comment: photo.comment,
            userId: userId,
            id: photo.id
        };
        res.status(200).send({ status: "success", data: formattedPhoto });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Photo Not Found" });
        }
        else {
            debug("Error when trying to update Photo with ID %d: %O", photoId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
});
exports.updateUserPhoto = updateUserPhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
