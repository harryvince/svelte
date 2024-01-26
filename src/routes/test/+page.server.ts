import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
        number: 24,
        harry: 'test',
        another: 'test',
	};
};
