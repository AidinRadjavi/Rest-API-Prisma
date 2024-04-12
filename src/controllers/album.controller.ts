import { matchedData} from "express-validator";
import { Request, Response } from "express";
import Debug from "debug";
import { authenticatedUsersId } from "../helper/authorization.helper";
import { addPhotoToAlbum, createAlbum, getAllAlbums, getOneSingleAlbum, updateAlbum } from "../services/album.services";
import { createNewAlbumType, getAllAlbumsFromUserId, updateAuthUserAlbum } from "../types/album.types";

const debug = Debug("prisma-album:album.controller");

//---------------------------------------------------------------------------------------------------------------------------------------
// Create an album

export const newAlbum = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as createNewAlbumType;

	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	if (!validatedData.title) {
		return res.status(400).send({ status: "fail", message: "Title cannot be empty, must contain atleast 3 characters" });
	}

	try {
		const album = await createAlbum({ ...validatedData, userId});

		res.status(201).send({ status: "success", data: {
			title: album.title,
			userId: userId,
			id: album.id
			}
		});

	} catch (err) {
		debug("Error when creating a new Album: %O", err);
		res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Get all albums

export const showAllAlbums = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as getAllAlbumsFromUserId;

	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {
		const album = await getAllAlbums(validatedData);

		const filteredAlbum = album.filter(album => album.userId === userId);

		res.status(200).send({ status: "success", data: filteredAlbum });

	} catch (err) {
		debug("Error when trying to query for all Albums: %O", err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Update an album

export const updateUserAlbum = async (req: Request, res: Response) => {

	const albumId = Number(req.params.albumId);
	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {

		const validatedData = matchedData(req) as updateAuthUserAlbum;
		const album = await updateAlbum(albumId, validatedData);

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

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			debug("Error when trying to update Album with ID %d: %O", albumId, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Link photo to album

export const addPhotoToAuthUserAlbum = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);
    const photoId = Number(req.body.id);
    const userId = authenticatedUsersId(req);

    if (!userId) {
        debug("Authentication failed");
        return res.status(401).send({ status: "fail", message: "Authentication required. Please try again" });
    }

    try {
        await addPhotoToAlbum(albumId, userId, photoId);

        debug("Request processed successfully");
        res.status(201).send({ status: "success", data: null });

    } catch (err: any) {
		if (err.code === "PA4041") {
            debug("Both Photo and Album Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });

		} else if (err.code === "P4041") {
            debug("Photo Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });

		} else if (err.code === "A4041") {
            debug("Album Not Found error: %O", err);
            res.status(404).send({ status: "error", message: err.message });

		} else if (err.code === "PA4031") {
            debug("You are not authorized to handle this Photo or Album");
            res.status(403).send({ status: "fail", message: "You are not authorized to handle this Photo or Album" });

		} else if (err.code === "P4031") {
            debug("User not authorized to link another user's photo");
            res.status(403).send({ status: "fail", message: "You are not authorized to link another user's photo" });

		} else if (err.code === "A4031") {
            debug("User not authorized to update another user's album");
            res.status(403).send({ status: "fail", message: "You are not authorized to update another user's album" });

		} else {
            debug("Error occurred: %O", err);
            debug("Error when trying to add Photo %o to Album with ID %d: %O", req.body, albumId, err);
            res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
        }
    }
};




//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single album with all photos in it

export const getSingleAlbum = async (req: Request, res: Response) => {

	const albumId = Number(req.params.albumId);
	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {
		const album = await getOneSingleAlbum(albumId, userId);

		if (album.userId !== userId) {
            return res.status(403).send({ status: "fail", message: "You are not authorized to view this album" });
        }

		const formattedAlbum = {
			id: album.id,
			title: album.title,
			photos: album.photo
		};

		res.status(200).send({ status: "success", data: formattedAlbum });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			debug("Error when trying to query Album with ID %d: %O", albumId, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
