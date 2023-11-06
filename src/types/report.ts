import { ImageType } from "../components/general/FileInput/FileInput";
import { IPet } from "./pet";

export interface IReport {
  content: string;
  title: string;
  petId: number;
  photos: ImageType[];
  pet?: IPet;
  reportDatCreation: string;
  id: number;
}
