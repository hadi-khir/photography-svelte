export interface IfcMetadata {
    id: number;
    photoId: number;
    title: string;
    caption: string;
    captureDate: Date;
    camera: string;
    lens: string | null;
    focalLength: number;
    iso: number;
    aperture: number;
    shutterSpeed: number;
    copyright: string;
    location: string;
    city: string;
    province: string;
    country: string;
}