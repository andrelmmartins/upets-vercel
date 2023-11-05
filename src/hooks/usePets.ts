import React from "react";
import { PetsContext } from "../context/PetsProvider";

export const usePets = () => React.useContext(PetsContext);
