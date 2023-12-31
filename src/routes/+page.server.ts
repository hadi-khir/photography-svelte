
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

const response = await prisma.album.findMany({

        include: {photos: {
            include: {metadata: true}},
        }
    }
);

return { albums: response };
}) satisfies PageServerLoad;