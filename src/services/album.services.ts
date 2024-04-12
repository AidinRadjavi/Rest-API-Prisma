import prisma from "../prisma";
import { createNewAlbumType, getAllAlbumsFromUserId, updateAuthUserAlbum } from "../types/album.types";
import { userId } from "../types/user.types";

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Create a album
 *
 * @param data Album data
 */
export const createAlbum = async (data: createNewAlbumType & userId) => {
	return await prisma.album.create({
		data: {
			...data
		}
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get all albums
 *  *
 * @param data Album data
 */
export const getAllAlbums = async (data: getAllAlbumsFromUserId) => {
	return await prisma.album.findMany();
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Update an album
 *
 * @param albumId The ID of the album to update
 * @param data Album data
 * @returns
 */
export const updateAlbum = async (albumId: number, data: updateAuthUserAlbum) => {
	return await prisma.album.update({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
		data,
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Link photo to album
 *
 * @param photoId The ID of the photo to add
 * @param albumId The ID of the album to link photo too
 * @param userId The ID of the auth user
*/
export const addPhotoToAlbum = async (albumId: number, userId: number, photoId: number) => {

    const photo = await prisma.photo.findUnique({
        where: {
            id: photoId,
        },
        select: {
            userId: true,
        },
    });

    const album = await prisma.album.findUnique({
        where: {
            id: albumId,
        },
        select: {
            userId: true,
        },
    });

    if (!photo && !album) {
        throw { code: "PA4041", message: "Both Photo and Album Not Found" };
    } else if (!photo) {
        throw { code: "P4041", message: "Photo Not Found" };
    } else if (!album) {
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

    return await prisma.photo.update({
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
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get a single Album
 *
 * @param albumId The ID of the album to get
 * @param userId The ID of the auth user
 */
export const getOneSingleAlbum = async (albumId: number, userId: number) => {

	const album = await prisma.album.findUnique({
		where: {
			id: albumId,
		},
		select: {
			userId: true,
		},
	});

	return await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
		},
		include: {
			photo: true,
		},
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
