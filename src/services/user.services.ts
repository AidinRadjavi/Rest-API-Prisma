import prisma from "../prisma";
import { createNewUserType } from "../types/user.types";

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Create a new user
 // @param data
 */
export const createNewUser = async (data: createNewUserType) => {
	return await prisma.user.create({
		data,
	});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get user by email
 // @param data
 */
export const getUserFromEmail = async (email: string) => {
	return await prisma.user.findUnique({
			where: {
				email: email
			},
		});
};

//---------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get a User by id
 *
 * @param id Id of user to get
 */
export const getUserFromId = async (id: number) => {
	return await prisma.user.findUnique({
			where: {
				id,
			},
		});
};

//---------------------------------------------------------------------------------------------------------------------------------------

