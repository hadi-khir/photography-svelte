export {};

declare global {

    interface IPhoto {
    
        id: number;
        title: string;
        url: string;
        thumbnail: string;
        albumId: number;
        metadata?: IMetadata | null;
    }

    interface IMetadata {

        id: number;
        photoId: number;
        title: string;
        caption?: string | null;
        captureDate: Date | null;
        make: string;
        model: string;
        lens: string;
        focalLength: number;
        iso: number;
        aperture: number;
        shutterSpeed: number;
        copyright?: string | null;
        location?: string | null;
        city?: string | null;
        province?: string | null;
        country?: string | null;
    }

    interface IAlbum {

        id: number;
        title: string;
        photos: IPhoto[];
    }
}