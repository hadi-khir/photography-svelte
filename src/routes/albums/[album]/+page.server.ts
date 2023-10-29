import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

// use album param to fetch album from db
export const load = (async ({ params: { album } }) => {
    const albumResponse = await prisma.album.findUnique({
        where: { title: album },
        include: {photos: true}
    });

    return { albumResponse };
}) satisfies PageServerLoad;