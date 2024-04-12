// Album type

import { Album } from "@prisma/client";

// Album ID
export type AlbumId = Pick<Album, "id">

// Create album
export type createNewAlbumType = Omit<Album, "photo">;

// Get all of authenticated users albums
export type getAllAlbumsFromUserId = Partial<Album>;

// Update auth users album
export type updateAuthUserAlbum = Partial<createNewAlbumType>;
