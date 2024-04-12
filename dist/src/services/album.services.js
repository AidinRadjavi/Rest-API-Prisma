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
exports.getOneSingleAlbum = exports.addPhotoToAlbum = exports.updateAlbum = exports.getAllAlbums = exports.createAlbum = void 0;
const prisma_1 = __importDefault(require("../prisma"));
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Create a album
 *
 * @param data Album data
 */
const createAlbum = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.create({
        data: Object.assign({}, data)
    });
});
exports.createAlbum = createAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get all albums
 *  *
 * @param data Album data
 */
const getAllAlbums = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.findMany();
});
exports.getAllAlbums = getAllAlbums;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Update an album
 *
 * @param albumId The ID of the album to update
 * @param data Album data
 * @returns
 */
const updateAlbum = (albumId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.update({
        where: {
            id: albumId,
        },
        include: {
            user: true,
        },
        data,
    });
});
exports.updateAlbum = updateAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Link photo to album
 *
 * @param photoId The ID of the photo to add
 * @param albumId The ID of the album to link photo too
 * @param userId The ID of the auth user
*/
const addPhotoToAlbum = (albumId, userId, photoId) => __awaiter(void 0, void 0, void 0, function* () {
    const photo = yield prisma_1.default.photo.findUnique({
        where: {
            id: photoId,
        },
        select: {
            userId: true,
        },
    });
    const album = yield prisma_1.default.album.findUnique({
        where: {
            id: albumId,
        },
        select: {
            userId: true,
        },
    });
    if (!photo && !album) {
        throw { code: "PA4041", message: "Both Photo and Album Not Found" };
    }
    else if (!photo) {
        throw { code: "P4041", message: "Photo Not Found" };
    }
    else if (!album) {
        throw { code: "A4041", message: "Album Not Found" };
    }
    if (photo.userId !== userId && album.userId !== userId) {
        throw { code: "PA4031", message: "Neither Photo nor Album belongs to the user" };
    }
    if (photo.userId !== userId) {
        throw { code: "P4031", message: "User not authorized to link another user's photo" };
    }
    if (album.userId !== userId) {
        throw { code: "A4031", message: "User not authorized to update another user's album" };
    }
    return yield prisma_1.default.photo.update({
        where: {
            id: photoId,
        },
        data: {
            album: {
                connect: {
                    id: albumId,
                },
            },
        },
        include: {
            album: true,
        },
    });
});
exports.addPhotoToAlbum = addPhotoToAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get a single Album
 *
 * @param albumId The ID of the album to get
 * @param userId The ID of the auth user
 */
const getOneSingleAlbum = (albumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const album = yield prisma_1.default.album.findUnique({
        where: {
            id: albumId,
        },
        select: {
            userId: true,
        },
    });
    return yield prisma_1.default.album.findUniqueOrThrow({
        where: {
            id: albumId,
        },
        include: {
            photo: true,
        },
    });
});
exports.getOneSingleAlbum = getOneSingleAlbum;
//---------------------------------------------------------------------------------------------------------------------------------------
