import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabase } from "../../supabaseClient";
import prisma from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const albumTitle = formData.get("album") as string;
  const errors = [];
  const uploadedImages = [];
  const imageMetadataList = (JSON.parse(
    formData.getAll("metadata").toString()
  ) as unknown) as { fileName: string; metadata: object }[];

  if (formData.has("images") && albumTitle) {
    const images = formData.getAll("images");

    for (const file of images) {
      const image = file as File;
      const { error } = await supabase.storage
        .from("photos/" + albumTitle)
        .upload(image.name, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        errors.push(error);
      }

      const publicUrl = await supabase.storage
        .from("photos")
        .getPublicUrl(albumTitle + "/" + image.name);
      uploadedImages.push({ publicUrl: publicUrl, name: image.name });

      const matchingMetadata = imageMetadataList.find(
        (metadata) => metadata.fileName === String(image.name)
      );

      if (publicUrl && matchingMetadata) {
        const metadata = matchingMetadata.metadata as IMetadata;
        const response = await prisma.photo.create({
          data: {
            url: String(publicUrl.data.publicUrl),
            thumbnail: String(publicUrl.data.publicUrl),
            metadata: {
              create: {
                make: metadata.make,
                model: metadata.model,
                iso: metadata.iso,
                aperture: metadata.aperture,
                shutterSpeed: metadata.shutterSpeed,
                focalLength: metadata.focalLength,
                lens: metadata.lens,
                title: metadata.title,
              },
            },
            album: {
              connectOrCreate: {
                where: { title: albumTitle },
                create: { title: albumTitle },
              },
            },
          },
        });

        console.log(response);

        if (error) {
          errors.push(error);
        }
      }
    }

    /**
     * at this point we have
     * publicUrl
     * matchingMetadata
     * imageName
     * albumTitle
     *
     * we are just missing the thumbnail.
     */
  }

  return json(uploadedImages);
};
