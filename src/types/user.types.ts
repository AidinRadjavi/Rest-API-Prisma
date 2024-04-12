// User type

import { User } from "@prisma/client";

export type userId = Pick<User, "id">;

// Create new user
export type createNewUserType = Omit<User, "id">;
