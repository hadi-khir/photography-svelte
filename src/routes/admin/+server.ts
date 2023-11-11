import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabase } from "../../supabaseClient";
import prisma from "$lib/prisma";
import sharp from "sharp";
import type { OutputInfo } from "sharp";
import axios from "axios";

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

      const { response, error } = await storeImage(albumTitle, image);

      if (error) {
        errors.push(error);
        // TODO: Handle error after storage upload
      }

      if (response) {
        // TODO: Handle response after storage upload
      }

      const publicUrl = getPublicUrlForUploadedImage(albumTitle, image.name);
      uploadedImages.push({ publicUrl: publicUrl, name: image.name });
      const thumbnailFile = await generateThumbnail(publicUrl, image.name);
      if (thumbnailFile) {
        const thumbnailPath = albumTitle + "/thumbs";
        const { response, error } = await storeImage(
          thumbnailPath,
          thumbnailFile
        );

        if (error) {
          errors.push(error);
          // TODO: Handle error after storage upload
        }

        if (response) {
          // TODO: Handle response after storage upload
        }

        if (errors.length === 0) {
          const publicUrl = getPublicUrlForUploadedImage(
            thumbnailPath,
            thumbnailFile.name
          );
          uploadedThumbnails.push({ publicUrl: publicUrl, name: image.name });
        }
      }
    }

    for (const image of uploadedImages) {
      // check if the public url exists in the db before continuing
      // if it does, return an error
      // if it doesn't, continue
      const imageExists = await prisma.photo.findFirst({
        where: { url: image.publicUrl },
      });

      if (imageExists) {
        console.log("Image already exists in database:" + imageExists.url);
        continue;
      }

      //TODO: pass all this to a create function

      const matchingMetadata = imageMetadataList.find(
        (metadata) => metadata.fileName === String(image.name)
      );

      const mainImage = uploadedImages.find(
        (image) => image.name === String(image.name)
      );

      const thumbnail = uploadedThumbnails.find(
        (thumbnail) => thumbnail.name === String(image.name)
      );

      if (mainImage && matchingMetadata && thumbnail) {
        const metadata = matchingMetadata.metadata as IMetadata;
        await prisma.photo.create({
          data: {
            url: String(mainImage.publicUrl),
            thumbnail: String(thumbnail.publicUrl),
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
      }
    }
  }

  return json(uploadedImages);
};

async function generateThumbnail(imgUrl: string, fileName: string): Promise<File | undefined> {
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

    const file = new File([data], fileName, { type: info.format });

    return file;
  } catch (error) {
    console.log(error);
  }
}

const storeImage = async (albumTitle: string, image: File) => {
  const bucketName: string = "photos";
  const cacheControl: string = "3600";

  const { data, error } = await supabase.storage
    .from(bucketName + "/" + albumTitle)
    .upload(image.name, image, {
      cacheControl: cacheControl,
      upsert: false,
    });

  return { response: data, error: error };
};

const getPublicUrlForUploadedImage = (albumTitle: string, fileName: string) => {
  const bucketName = "photos";
  return supabase.storage
    .from(bucketName)
    .getPublicUrl(albumTitle + "/" + fileName).data.publicUrl;
};
