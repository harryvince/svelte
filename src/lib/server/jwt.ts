import { error } from '@sveltejs/kit';
import * as jose from 'jose';

// This needs to be an env variable in future
const JWT_SECRET = 'Super_Secret_Value';

type JWTPayload = {
	username: string;
	id: number;
};

export const createAuthJWT = async (data: JWTPayload) => {
	const jwt = await new jose.SignJWT(data)
		.setProtectedHeader({ alg: 'HS256' })
		.sign(new TextEncoder().encode(JWT_SECRET));
	return jwt;
};

export const verifyAuthJWT = async (token: string) => {
	try {
		const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
		return payload as JWTPayload;
	} catch {
		throw error(401, 'Invalid or missing Auth, you are not logged in');
	}
};
