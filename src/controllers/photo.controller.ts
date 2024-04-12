import { matchedData} from "express-validator";
import { Request, Response } from "express";
import Debug from "debug";
import { createNewPhotoType, getAllPhotosExceptUserId, updateAuthUserPhoto } from "../types/photo.types";
import { createPhoto, getAllPhotos, getSinglePhoto, updatePhoto } from "../services/photo.services";
import { authenticatedUsersId } from "../helper/authorization.helper";

const debug = Debug("prisma-photo:photo.controller");

//---------------------------------------------------------------------------------------------------------------------------------------
// Create a photo

export const newPhoto = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as createNewPhotoType;

	const userId = authenticatedUsersId(req);

	if(!userId) {
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
		const photo = await createPhoto({ ...validatedData, userId });

		res.status(201).send({ status: "success", data: {
			title: photo.title,
			url: photo.url,
			comment: photo.comment,
			userId: userId,
			id: photo.id
			}
		});

	} catch (err) {
		debug("Error when creating a new Photo: %O", err);
		res.status(500).send({ status: "error", message: "Something went wrong when creating the photo in the database" });
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Get all photos

export const showAllPhotos = async (req: Request, res: Response) => {

	const validatedData = matchedData(req) as getAllPhotosExceptUserId;

	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {
		const photo = await getAllPhotos(validatedData);

		const filteredPhotos = photo.filter(photo => photo.userId === userId);

		const formattedPhotos = filteredPhotos.map(photo => ({
			id: photo.id,
			title: photo.title,
			url: photo.url,
			comment: photo.comment
		}));
		res.status(200).send({ status: "success", data: formattedPhotos });

	} catch (err) {
		debug("Error when trying to query for all Photos: %O", err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Get a single photo

export const showSinglePhoto = async (req: Request, res: Response) => {

	const photoId = Number(req.params.photoId);
	const userId = authenticatedUsersId(req);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {

		const photo = await getSinglePhoto(photoId);

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

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ status: "error", message: "Photo Not Found" });
		} else {
			debug("Error when trying to query for Photo with ID %d: %O", photoId, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
// Update a photo

export const updateUserPhoto = async (req: Request, res: Response) => {

	const userId = authenticatedUsersId(req);
	const photoId = Number(req.params.photoId);

	if(!userId) {
		return res.status(401).send({ status: "fail", message: "Authentication required. Please try again"
		});
	}

	try {

		const validatedData = matchedData(req) as updateAuthUserPhoto;
		const photo = await updatePhoto(photoId, validatedData);

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

	} catch (err: any) {
		if (err.code === "P2025") {

			res.status(404).send({ status: "error", message: "Photo Not Found" });
		} else {
			debug("Error when trying to update Photo with ID %d: %O", photoId, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
};

//---------------------------------------------------------------------------------------------------------------------------------------
