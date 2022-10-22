import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";

class PerfilDao {
  protected static async obtenerPerfiles(res: Response): Promise<any> {
    const informacion = await PerfilEsquema.find();
    res.status(200).json(informacion);
  }
protected static async crearPerfil(
    parametros: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findOne(parametros);
    if (existe) {
      res.status(400).json({ respuesta: "El Perfil ya existe" });
    } else {
      const objPerfil = new PerfilEsquema(parametros);
      objPerfil.save((miError, miObjeto) => {
        if (miError) {
          res.status(400).json({ respuesta: "El Perfil no se puede grabar" });
        } else {
          res.status(200).json({
            respuesta: "El Perfil creado correctamente",
            codigo: miObjeto._id,
          });
        }
      });
    }
  }

  protected static async eliminarPerfil(
    identificador: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findById(identificador);

    if (existe) {
      PerfilEsquema.findByIdAndDelete(
        identificador,
        (miError: any, miObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "El perfil no se puede eliminar" });
          } else {
            res.status(200).json({
              respuesta: "El perfil fue eliminado correctamente",
              eliminado: miObjeto,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "El perfil no existe" });
    }
  }

  protected static async actualizarPerfil(
    identificador: any,
    parametros: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findById(identificador);

    if (existe) {
      PerfilEsquema.findByIdAndUpdate(
        { _id: identificador },
        { $set: parametros },

        (miError: any, miObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "El perfil no se puede eliminar" });
          } else {
            res.status(200).json({
              respuesta: "El perfil fue eliminado correctamente",
              antiguo: miObjeto,
              nuevo: parametros,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "El perfil no existe" });
    }
  }
}

export default PerfilDao;

