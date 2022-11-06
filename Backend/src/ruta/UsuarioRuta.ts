import { Router } from "express";
import usuarioControlador from "../controlador/UsuarioControlador";

class UsuarioRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.get('/todos', usuarioControlador.consulta);
        this.rutaAPI.get('/todos/:codPerfil', usuarioControlador.consultPerfil);
        this.rutaAPI.get('/cantxperfil/:codPerfil', usuarioControlador.cantidadEnPerfil);

        this.rutaAPI.post('/crear', usuarioControlador.crear);
        this.rutaAPI.post('/iniciar', usuarioControlador.iniciar);
        this.rutaAPI.delete('/eliminar/:codUsuario', usuarioControlador.eliminar);
        this.rutaAPI.put('/actualizar/:codUsuario', usuarioControlador.actualizar);
    }

};

const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.rutaAPI;
