import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import jwt from "jsonwebtoken";
import PerfilEsquema from "../esquema/PerfilEsquema";
import UsuarioEsquema from "../esquema/UsuarioEsquema";

class UsuarioDao {

    // Iniciar sesión
    // ************************************************************************************
    protected static async iniciarSesion(parametros: any, res: Response): Promise<any> {
        const miCorreo = parametros.correoUsuario;
        const miClave = parametros.claveUsuario;
        UsuarioEsquema.findOne({ correoUsuario: miCorreo }).populate({ path: "codPerfil", select: "nombrePerfil" })
            .exec((miError, objeto) => {
                if (objeto) {
                    const claveCorrecta = cifrar.compareSync(miClave, objeto.claveUsuario);
                    if (claveCorrecta) {
                        const datosVisibles = {
                            codUsuario: objeto._id,
                            correo: miCorreo,
                            perfil: objeto.codPerfil.nombrePerfil
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({ tokenMintic: miToken });
                    } else {
                        res.status(400).json({ respuesta: "Credenciales incorrectas" });
                    }
                } else {
                    res.status(400).json({ respuesta: "Credenciales incorrectas" });
                }
            });
    }
    // ************************************************************************************


    // Cantidad de usuarios x perfil dado
    // ************************************************************************************
    protected static async cantidadUsuariosEnPerfil(identificadorPerfil: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificadorPerfil)) {
            const llave = { _id: identificadorPerfil };
            const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con el perfil completo
    // ************************************************************************************
    protected static async obtenerUsuarios(res: Response): Promise<any> {
        UsuarioEsquema.find().sort({ _id: -1 }).populate("codPerfil")
            .exec((miError, objeto) => {
                if (miError) {
                    console.log(miError);
                    res.status(400).json({ respuesta: "Error en la consulta" });
                    //process.exit(-1);
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener todos los usuarios con un perfil dado y con datos específicos
    // ************************************************************************************
    protected static async obtenerUsuariosPerfil(identificador: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            const llave = { _id: identificador };
            UsuarioEsquema.find({ codPerfil: llave }).sort({ _id: -1 })
                .populate({ path: "codPerfil", select: "nombrePerfil" })
                .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    } else {
                        res.status(200).json(objeto);
                    }
                });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Creación de un usuario con un perfil indicado por referencia
    // ************************************************************************************
    protected static async crearUsuario(correo: any, parametros: any, res: Response): Promise<any> {
        // Validación existencia perfil
        // **************************************
        const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
        const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
        const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
        if (existePerfil) {
            parametros.codPerfil = existePerfil._id;
        } else {
            const objPerfil = new PerfilEsquema(jsonPerfil);
            objPerfil.save();
            parametros.codPerfil = objPerfil._id;
        }
        // **************************************

        const existe = await UsuarioEsquema.findOne(correo).exec();
        if (existe) {
            res.status(400).json({ respuesta: "El correo ya existe" });
        } else {
            parametros.claveUsuario = cifrar.hashSync(parametros.claveUsuario, 8);

            const objUsuario = new UsuarioEsquema(parametros);
            objUsuario.save((miError, objeto) => {
                if (miError) {
                    console.log(miError);
                    res.status(400).json({ respuesta: 'Error al crear el usuario' });
                } else {
                    const datosVisibles = {
                        codUsuario: objeto._id,
                        correo: parametros.correoUsuario,
                        perfil: nombrePerfilPorDefecto
                    };
                    const llavePrivada = String(process.env.SECRETA);
                    const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                    res.status(200).json({ tokenMintic: miToken });
                }
            });
        }
    }
    // ************************************************************************************


    // Eliminar usuario por identificador
    // ************************************************************************************
    protected static async eliminarUsuario(identificador: any, res: Response): Promise<any> {
        const existe = await UsuarioEsquema.findById(identificador).exec();
        if (existe) {
            UsuarioEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Perfil" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por identificador
    // ************************************************************************************
    protected static async actualizarUsuario(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        const existe = await UsuarioEsquema.findById(identificador).exec();
        if (existe) {
            UsuarioEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************
    
}

export default UsuarioDao;