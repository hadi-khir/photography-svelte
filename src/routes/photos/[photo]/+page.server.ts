import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

// use album param to fetch album from db
export const load = (async ({ params: { photo } }) => {
    const photoResponse = await prisma.photo.findUnique({
        where: { id: Number(photo) },
        include: {metadata: false}
    });

    return { photoResponse };
}) satisfies PageServerLoad;