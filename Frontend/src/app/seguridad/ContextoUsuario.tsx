import { createContext } from "react";
import { propUsuario } from "../modelos/MisInterfaces";

export const ContextoUsuario = createContext<propUsuario | null>(null);