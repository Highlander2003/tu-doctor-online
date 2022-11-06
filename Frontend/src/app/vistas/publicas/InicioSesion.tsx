import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import * as cifrado from "js-sha512";

import MiSesion from "../../modelos/MiSesion";
import CrearUsuario from "../../modelos/CrearUsuario";
import { propUsuario } from "../../modelos/MisInterfaces";
import logoReact from "../../../assets/image/logoReact.png";
import ServicioPublico from "../../servicios/ServicioPublico";
import { ContextoUsuario } from "../../seguridad/ContextoUsuario";
import { useFormulario } from "../../utilidades/misHooks/useFormulario";


import { ToastContainer } from "react-toastify";
import { MensajeToastify } from "../../utilidades/funciones/MensajeToastify";




export const InicioSesion = () => {
  // Definición de variables
  // *******************************************************************
  const navigate = useNavigate();
  type miFormularioHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const { actualizar } = useContext(ContextoUsuario) as propUsuario;

  // Formulario con hooks
  // *******************************************************************
  let { correoUsuario, claveUsuario, dobleEnlace, objeto } = useFormulario<CrearUsuario>(new CrearUsuario("", "", ""));

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto.correoUsuario = "";
    objeto.claveUsuario = "";

    formulario.correoUsuario.value = "";
    formulario.claveUsuario.value = "";

    formulario.classList.remove("was-validated");
  };

  

  // Iniciar sesión
  // *******************************************************************
  const enviarFormulario = async (fh: miFormularioHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const claveCifrada = cifrado.sha512(objeto.claveUsuario);
      objeto.claveUsuario = claveCifrada;
      const resultado = await ServicioPublico.iniciarSesion(objeto);

      if (resultado.tokenMintic) {
        const objJWTRecibido: any = jwtDecode(resultado.tokenMintic);
        const usuarioCargado = new MiSesion(
          objJWTRecibido.codUsuario,
          objJWTRecibido.correo,
          objJWTRecibido.perfil
        );
        actualizar(usuarioCargado);

        localStorage.setItem("tokenMintic", resultado.tokenMintic);
        navigate("/dashboard");
        setEnProceso(false);
      } else {
        limpiarCajas(formulario);
        MensajeToastify("Error","Credenciales invalidas",8000);
      }
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <Link
                      to="/"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={logoReact} alt="" />
                      <span className="d-none d-lg-block">Mintic 2022</span>
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Inicio de sesión
                        </h5>
                        <p className="text-center small">
                          Credenciales requeridas
                        </p>
                      </div>

                      <Form
                        noValidate
                        validated={enProceso}
                        onSubmit={enviarFormulario}
                        className="row g-3"
                      >
                        <div className="col-12">
                          <Form.Group controlId="correoUsuario">
                            <Form.Label>Correo electrónico</Form.Label>
                            <div className="input-group has-validation">
                              <span className="input-group-text">@</span>
                              <Form.Control
                                required
                                type="email"
                                name="correoUsuario"
                                className="form-control"
                                value={correoUsuario}
                                onChange={dobleEnlace}
                              />
                              <Form.Control.Feedback type="invalid">
                                correo electrónico es obligatorio
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group controlId="claveUsuario">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              name="claveUsuario"
                              className="form-control"
                              minLength={4}
                              value={claveUsuario}
                              onChange={dobleEnlace}
                            />
                            <Form.Control.Feedback type="invalid">
                              Mínimo 4 caracteres
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Iniciar sesión
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            ¿No tienes cuenta?{" "}
                            <Link to="/register">Clic aquí para crear una</Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};