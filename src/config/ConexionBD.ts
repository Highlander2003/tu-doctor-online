import { connect } from "mongoose";

const ConexionDb = () => {
  //variables de configuración
  const urlConexion = String(process.env.DB_MONGO);
  console.log(urlConexion);
  connect(urlConexion)
    .then(() => {
      console.log("Conectado a ", urlConexion);
    })
    .catch((elError) => {
      console.log("No se puede conectar a mongo ", hayError);
    });
};

export default ConexionDb;

