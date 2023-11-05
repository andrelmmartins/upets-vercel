import { IPet } from "./pet";
import { IAddress, IUser } from "./user";

export interface ITemporaryHouse {
  addressId: number;
  careTakers: IUser[];
  createdAt: string;
  description?: string | null;
  id: number;
  ownerId: number;
  pets: IPet[];
  title: string;
  updatedAt: string;
  address: IAddress;
}

export interface TemporaryHousePayload {
  description?: string;
  careTakerIds: number[];
  pets: number[];
  address: IAddress;
  title: string;
}
