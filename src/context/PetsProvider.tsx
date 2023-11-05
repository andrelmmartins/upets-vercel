import React, { createContext, useEffect, useState } from "react";

import { Pet } from "../models/Pet";
import * as api from "../api/pets";
import { useSession } from "next-auth/react";

interface ContextProps {
  pets: Pet[];
  createPet: (props: api.CreatePetProps) => Promise<void>;
}

export const PetsContext = createContext({} as ContextProps);

export default function PetsProvider(props: { children: React.ReactNode }) {
  const session = useSession();
  const [pets, setPets] = useState<Pet[]>([]);

  async function getPets() {
    const parsedPets: Pet[] = [];
    if (session.data && session.data.user.token) {
      const response = await api.getPets(session.data.user.token);

      if (Array.isArray(response)) {
        response.forEach((petObj) => {
          try {
            const parsed = new Pet(petObj);
            if (parsed) {
              parsedPets.push(parsed);
            }
          } catch (e) {
            console.log(e);
          }
        });
      }
    }

    setPets(parsedPets);
  }

  async function createPet(props: api.CreatePetProps) {
    try {
      if (session.data && session.data.user.token) {
        await api.createPet(props, session.data.user.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await getPets();
    }
  }

  useEffect(() => {
    getPets();
  }, [session.data]);

  return (
    <PetsContext.Provider
      value={{
        pets,
        createPet,
      }}
    >
      {props.children}
    </PetsContext.Provider>
  );
}
