import { Response } from 'express';
import PerfilEsquema from "../esquema/PerfilEsquema";
import UsuarioEsquema from '../esquema/UsuarioEsquema';

class PerfilDao {

    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    protected static async obtenerUnPerfil(identificador: any, res: Response): Promise<any> {
        const jsonPerfil = { _id: identificador };
        const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
        if (existePerfil) {
            res.status(200).json(existePerfil);
        } else {
            res.status(400).json({ respuesta: "El perfil NO existe con ese identificador" });
        }
    }
    // ************************************************************************************


    // Obtener perfiles en orden descendente (-1)
    // ************************************************************************************
    protected static async obtenerPerfiles(res: Response): Promise<any> {
        const datos = await PerfilEsquema.find().sort({ _id: -1 });;
        res.status(200).json(datos);
    }
    // ************************************************************************************


    // Crear perfil verificando su existencia
    // ************************************************************************************
    protected static async crearPerfil(parametros: any, res: Response): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;
        const existe = await PerfilEsquema.findOne(parametros);

        if (existe) {
            res.status(400).json({ respuesta: "El perfil ya existe" });
        } else {
            const objPerfil = new PerfilEsquema(parametros);
            objPerfil.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear el Perfil' });
                } else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        }
    }
    // ************************************************************************************


    // Eliminar perfil por código, verificando antes que no tenga usuarios asociados
    // ************************************************************************************
    protected static async eliminarPerfil(parametro: any, res: Response): Promise<any> {
        const llave = { _id: parametro };
        const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: llave });
        if (cantidad > 0) {
            res.status(400).json({ respuesta: 'Error, el perfil tiene usuarios relacionados' });
        } else {
            const existe = await PerfilEsquema.findById(parametro).exec();
            if (existe) {
                PerfilEsquema.deleteOne({ _id: parametro }, (miError: any, objeto: any) => {
                    //PerfilEsquema.findByIdAndDelete(parametro, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al eliminar el Perfil' });
                    } else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            } else {
                res.status(400).json({ respuesta: "El perfil NO existe" });
            }
        }
    }
    // ************************************************************************************


    // Actualizar perfil por código y con body JSON
    // ************************************************************************************
    protected static async actualizarPerfil(codigo: string, parametros: any, res: Response): Promise<any> {
        const existe = await PerfilEsquema.findById(codigo).exec();
        if (existe) {
            PerfilEsquema.findByIdAndUpdate(
                { _id: codigo },
                { $set: parametros },
                (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al actualizar el Perfil' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El perfil NO existe" });
        }
    }
    // ************************************************************************************

};

export default PerfilDao;