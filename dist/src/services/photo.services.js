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
exports.updatePhoto = exports.getSinglePhoto = exports.getAllPhotos = exports.createPhoto = void 0;
const prisma_1 = __importDefault(require("../prisma"));
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Create a photo
 *
 * @param data Photo data
 */
const createPhoto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.create({
        data: Object.assign({}, data)
    });
});
exports.createPhoto = createPhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get all photos
 *  *
 * @param data Photo data
 */
const getAllPhotos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findMany();
});
exports.getAllPhotos = getAllPhotos;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get a single photo
 *
 * @param data Single photo data
 */
const getSinglePhoto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findUniqueOrThrow({
        where: {
            id: id,
        }
    });
});
exports.getSinglePhoto = getSinglePhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Update an photo
 *
 * @param photoId The ID of the photo to update
 * @param data Photo data
 * @returns
 */
const updatePhoto = (photoId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.update({
        where: {
            id: photoId,
        },
        include: {
            User: true,
        },
        data,
    });
});
exports.updatePhoto = updatePhoto;
//---------------------------------------------------------------------------------------------------------------------------------------
