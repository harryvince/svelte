import bcrypt from 'bcrypt';
import type { RequestEvent } from '@sveltejs/kit';
import { error, redirect } from '@sveltejs/kit';
import { createAuthJWT } from '$lib/server/jwt';

// Can't be bothered with a DB so this will be our substitute
const user = {
	id: 1,
	username: 'harry',
	password: bcrypt.hashSync('password', 10)
};

export const load = async (event: RequestEvent) => {
	// Get sessionId from token

	const token = event.cookies.get('auth_token');

	// If there's a token redirect to homepage
	if (token && token !== '') {
		throw redirect(301, '/');
	}
};

export const actions = {
	default: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || !password) {
			throw error(400, 'You must provide an email and password');
		}

		if (username !== user.username) {
			throw error(404, 'User account not found');
		}

		const correctPassword = await bcrypt.compare(password.toString(), user.password);

		if (!correctPassword) {
			throw error(400, 'Incorrect password...');
		}

		const token = await createAuthJWT({
			id: user.id,
			username
		});

		event.cookies.set('auth_token', token, {
			path: '/'
		});

		throw redirect(301, '/');
	}
};
