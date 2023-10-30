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
        camera?: ICamera | null;
        lens?: ILens | null;
        focalLength: number;
        iso: number;
        aperture: number;
        shutterSpeed: number;
        copyright?: string | null;
        location?: string | null;
        city: string;
        province: string;
        country: string;
    }

    interface ILens {
        id: number;
        name: string;
        metadata?: IMetadata[];
    }

    interface ICamera {
        id: number;
        model: string;
        lens?: Lens;
        metadata?: IMetadata[];
    }

    interface IAlbum {

        id: number;
        title: string;
        photos: IPhoto[];
    }
}