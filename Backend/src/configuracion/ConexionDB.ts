import { connect } from "mongoose";

const ConexionDB = () => {
  // variables de configuracion
  const urlConexion = String(process.env.DB_MONGO);
  connect(urlConexion)
    .then(() => {
      console.log("conectado a", urlConexion);
    })
    .catch((elError) => {
      console.log("no se puede conectar a mongo", elError);
    });
};

export default ConexionDB;
