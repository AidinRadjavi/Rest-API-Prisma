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
exports.getSingleAlbum = exports.addPhotoToAuthUserAlbum = exports.updateUserAlbum = exports.showAllAlbums = exports.newAlbum = void 0;
const express_validator_1 = require("express-validator");
const debug_1 = __importDefault(require("debug"));
const authorization_helper_1 = require("../helper/authorization.helper");
const album_services_1 = require("../services/album.services");
const debug = (0, debug_1.default)("prisma-album:album.controller");
//---------------------------------------------------------------------------------------------------------------------------------------
// Create an album
const newAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = (0, express_validator_1.matchedData)(req);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    if (!validatedData.title) {
        return res.status(400).send({ status: "fail", message: "Title cannot be empty, must contain atleast 3 characters" });
    }
    try {
        const album = yield (0, album_services_1.createAlbum)(Object.assign(Object.assign({}, validatedData), { userId }));
        res.status(201).send({ status: "success", data: {
                title: album.title,
                userId: userId,
                id: album.id
            }
        });
    }
    catch (err) {
        debug("Error when creating a new Album: %O", err);
        res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
    }
});
exports.newAlbum = newAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums
const showAllAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = (0, express_validator_1.matchedData)(req);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const album = yield (0, album_services_1.getAllAlbums)(validatedData);
        const filteredAlbum = album.filter(album => album.userId === userId);
        res.status(200).send({ status: "success", data: filteredAlbum });
    }
    catch (err) {
        debug("Error when trying to query for all Albums: %O", err);
        res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
    }
});
exports.showAllAlbums = showAllAlbums;
//---------------------------------------------------------------------------------------------------------------------------------------
// Update an album
const updateUserAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albumId = Number(req.params.albumId);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const validatedData = (0, express_validator_1.matchedData)(req);
        const album = yield (0, album_services_1.updateAlbum)(albumId, validatedData);
        if (!validatedData.title) {
            return res.status(400).send({ status: "fail", message: "Title cannot be empty, must contain atleast 3 characters" });
        }
        if (album.userId !== userId) {
            return res.status(403).send({ status: "fail", message: "You are not authorized to update another user's album" });
        }
        const formattedAlbum = {
            title: album.title,
            userId: userId,
            id: album.id
        };
        res.status(200).send({ status: "success", data: formattedAlbum });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Album Not Found" });
        }
        else {
            debug("Error when trying to update Album with ID %d: %O", albumId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
});
exports.updateUserAlbum = updateUserAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
// Link photo to album
const addPhotoToAuthUserAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albumId = Number(req.params.albumId);
    const photoId = Number(req.body.id);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        debug("Authentication failed");
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again" });
    }
    try {
        yield (0, album_services_1.addPhotoToAlbum)(albumId, userId, photoId);
        debug("Request processed successfully");
        res.status(201).send({ status: "success", data: null });
    }
    catch (err) {
        if (err.code === "PA4041") {
            debug("Both Photo and Album Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });
        }
        else if (err.code === "P4041") {
            debug("Photo Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });
        }
        else if (err.code === "A4041") {
            debug("Album Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });
        }
        else if (err.code === "PA4031") {
            debug("You are not authorized to handle this Photo or Album");
            res.status(403).send({ status: "fail", message: "You are not authorized to handle this Photo or Album" });
        }
        else if (err.code === "P4031") {
            debug("User not authorized to link another user's photo");
            res.status(403).send({ status: "fail", message: "You are not authorized to link another user's photo" });
        }
        else if (err.code === "A4031") {
            debug("User not authorized to update another user's album");
            res.status(403).send({ status: "fail", message: "You are not authorized to update another user's album" });
        }
        else {
            debug("Error occurred: %O", err);
            debug("Error when trying to add Photo %o to Album with ID %d: %O", req.body, albumId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
});
exports.addPhotoToAuthUserAlbum = addPhotoToAuthUserAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single album with all photos in it
const getSingleAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albumId = Number(req.params.albumId);
    const userId = (0, authorization_helper_1.authenticatedUsersId)(req);
    if (!userId) {
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
        });
    }
    try {
        const album = yield (0, album_services_1.getOneSingleAlbum)(albumId, userId);
        if (album.userId !== userId) {
            return res.status(403).send({ status: "fail", message: "You are not authorized to view this album" });
        }
        const formattedAlbum = {
            id: album.id,
            title: album.title,
            photos: album.photo
        };
        res.status(200).send({ status: "success", data: formattedAlbum });
    }
    catch (err) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Album Not Found" });
        }
        else {
            debug("Error when trying to query Album with ID %d: %O", albumId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
});
exports.getSingleAlbum = getSingleAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
