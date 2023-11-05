import api from "./instance";

export const getPets = async (token: string) => {
  const response = await api
    .get(`/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  return response;
};

export interface CreatePetProps {
  name: string;
  age: number;
  photos: {
    title: string;
    fileSize?: number;
    fileUrl: string;
  }[];
}

export const createPet = async (props: CreatePetProps, token: string) => {
  const response = await api
    .post(`/pets`, props, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  return response;
};
