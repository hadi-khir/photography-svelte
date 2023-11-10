import prisma from "$lib/prisma";
import type { PageServerLoad } from "../$types";

export const load = (async () => {
    const albumResponse = await prisma.album.findMany({
        select: {title: true}
    });

    return { albumResponse };
}) satisfies PageServerLoad;