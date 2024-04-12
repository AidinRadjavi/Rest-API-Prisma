// Photo type

import { Photo } from "@prisma/client";

// Photo ID
export type PhotoId = Pick<Photo, "id">

// Create new photo
export type createNewPhotoType = Omit<Photo, "album">;

// Show all photos for authenticated user
export type getAllPhotosExceptUserId = Omit<Photo, "userId">;

// Update authenticated users photos
export type updateAuthUserPhoto = Omit<Photo, "album">;
