import { verifyAuthJWT } from '$lib/server/jwt';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');

	if (!event.url.pathname.startsWith('/login')) {
        // This could be undefined but method will handle this for us
		event.locals.user = await verifyAuthJWT(token as string);
	}

	const response = await resolve(event);
	return response;
};
