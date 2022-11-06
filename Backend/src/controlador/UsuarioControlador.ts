import UsuarioDao from '../dao/UsuarioDao';
import { Request, Response } from 'express';

class UsuarioControlador extends UsuarioDao {

    public cantidadEnPerfil(req: Request, res: Response): void {
        UsuarioControlador.cantidadUsuariosEnPerfil(req.params.codPerfil, res);
    }

    public consulta(req: Request, res: Response): void {
        UsuarioControlador.obtenerUsuarios(res);
    }

    public consultPerfil(req: Request, res: Response): void {
        UsuarioControlador.obtenerUsuariosPerfil(req.params.codPerfil, res);
    }

    public crear(req: Request, res: Response): void {
        const correo = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(correo, req.body, res);
    }

    public iniciar(req: Request, res: Response): void {
        UsuarioControlador.iniciarSesion(req.body, res);
    }

    public eliminar(req: Request, res: Response): void {
        UsuarioControlador.eliminarUsuario(req.params.codUsuario, res);
    }

    public actualizar(req: Request, res: Response): void {
        UsuarioControlador.actualizarUsuario(req.params.codUsuario, req.body, res);
    }

};

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;