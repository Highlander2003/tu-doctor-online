import MiSesion from "./MiSesion";

export interface propSesion { children: React.ReactNode; }

export type propUsuario = { autenticado: MiSesion; actualizar: (usu: MiSesion) => void; };