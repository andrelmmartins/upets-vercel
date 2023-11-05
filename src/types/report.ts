import { ImageType } from "../components/general/FileInput/FileInput";
import { Pet } from "./pet";

export interface IReport {
  content: string;
  title: string;
  petId: number;
  photos: ImageType[];
  pet?: Pet;
  reportDatCreation: string;
  id: number;
}
