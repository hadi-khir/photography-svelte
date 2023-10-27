import type { IfcPhoto } from "./IfcPhoto";

export interface IfcAlbum {

    id: number;
    title: string;
    photos: IfcPhoto[];
}