import type { IfcMetadata } from "./IfcMetadata";

export interface IfcPhoto {
    
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    albumId: number;
    metadata: IfcMetadata | null;
}