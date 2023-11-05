import { IPet } from "./pet";

export interface IUser {
  birthDate: string | null;
  createdAt: string;
  document: string | null;
  email: string;
  id: number;
  name: string;
  phone: string | null;
  role: string;
  pets?: IPet[];
}

export interface IAddress {
  zipCode: string;
  district: string;
  street: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
