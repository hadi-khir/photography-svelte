import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabase } from "../../supabaseClient";
import prisma from "$lib/prisma";
import sharp from "sharp";
import type { OutputInfo } from "sharp";
import axios from "axios";
import { thumbnailUrl } from "exifr";

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const albumTitle = formData.get("album") as string;
  const errors = [];
  const uploadedImages = [];
  const uploadedThumbnails = [];
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

      const thumbnailFile = await generateThumbnail(publicUrl.data.publicUrl);

      if (thumbnailFile) {
        const {data: response, error: thumbnailError } = await supabase.storage
          .from("photos/" + albumTitle + "/thumbs")
          .upload(image.name, thumbnailFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (thumbnailError) {
          errors.push(thumbnailError);
        }

        const thumbnailPublicUrl = await supabase.storage
          .from("photos")
          .getPublicUrl(albumTitle + "/thumbs/" + image.name);

        uploadedThumbnails.push({ publicUrl: thumbnailPublicUrl, name: image.name });
      }

      const matchingMetadata = imageMetadataList.find(
        (metadata) => metadata.fileName === String(image.name)
      );

      const thumbnail = uploadedThumbnails.find(thumbnail => thumbnail.name === String(image.name)); 
      console.log(thumbnail, matchingMetadata, publicUrl);
      if (publicUrl && matchingMetadata && thumbnail) {
        const metadata = matchingMetadata.metadata as IMetadata;
        const response = await prisma.photo.create({
          data: {
            url: String(publicUrl.data.publicUrl),
            thumbnail: String(thumbnail.publicUrl.data.publicUrl),
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
                caption: metadata.caption,
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
        
        if (error) {
          errors.push(error);
        }
      }
    }
  }

  return json(uploadedImages);
};

async function generateThumbnail(imgUrl: string): Promise<File | undefined> {
  try {
    const response = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    // converts the arraybuffer to base64
    const buffer = Buffer.from(response.data, "base64");

    const { data, info }: { data: Buffer; info: OutputInfo } = await sharp(
      buffer
    )
      .resize({
        width: 500,
        height: 500,
      })
      .toBuffer({ resolveWithObject: true });

    const file = new File([data], "thumbnail.jpg", { type: info.format });

    return file;
  } catch (error) {
    console.log(error);
  }
}
