import { FC, useState } from "react";

import jwtDecode from "jwt-decode";
import MiSesion from "../modelos/MiSesion";
import { propSesion } from "../modelos/MisInterfaces";
import { ContextoUsuario } from "./ContextoUsuario";


const UsuarioSesion: FC<propSesion> = ({ children }) => {
  let usuarioCargado = new MiSesion("", "", "");
  const actualizar = (objUsuario: MiSesion) => { setAutenticado(objUsuario); };

  if (localStorage.getItem("tokenMintic")) {
    const elToken = String(localStorage.getItem("tokenMintic"));
    try {
      const objJWTRecibido: any = jwtDecode(elToken);
      usuarioCargado = new MiSesion( objJWTRecibido.codUsuario, objJWTRecibido.correo, objJWTRecibido.perfil );
    } catch {
      console.log("Error");
    }
  }
  const [autenticado, setAutenticado] = useState<MiSesion>(usuarioCargado);

  return (
    <ContextoUsuario.Provider value={{ autenticado, actualizar }}>
      {children}
    </ContextoUsuario.Provider>
  );
};

export default UsuarioSesion;