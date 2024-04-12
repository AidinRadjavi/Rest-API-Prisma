import prisma from "../prisma";
import { createNewPhotoType, getAllPhotosExceptUserId, updateAuthUserPhoto } from "../types/photo.types";
import { userId } from "../types/user.types";

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Create a photo
 *
 * @param data Photo data
 */
export const createPhoto = async (data: createNewPhotoType & userId) => {
	return await prisma.photo.create({
		data: {
			...data,
		}
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get all photos
 *  *
 * @param data Photo data
 */
export const getAllPhotos = async (data: getAllPhotosExceptUserId) => {
	return await prisma.photo.findMany();
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get a single photo
 *
 * @param data Single photo data
 */
export const getSinglePhoto = async (id: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: id,
		}
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Update an photo
 *
 * @param photoId The ID of the photo to update
 * @param data Photo data
 * @returns
 */
export const updatePhoto = async (photoId: number, data: updateAuthUserPhoto) => {
	return await prisma.photo.update({
		where: {
			id: photoId,
		},
		include: {
			User: true,
		},
		data,
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
