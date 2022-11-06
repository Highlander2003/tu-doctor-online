import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicioPublico from "../../servicios/ServicioPublico";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import CrearUsuario from "../../modelos/CrearUsuario";
import logoReact from "../../../assets/image/logoReact.png";
import { ContextoUsuario } from "../../seguridad/ContextoUsuario";
import { useFormulario } from "../../utilidades/misHooks/useFormulario";

import jwtDecode from "jwt-decode";
import * as cifrado from "js-sha512";
import MiSesion from "../../modelos/MiSesion";
import { propUsuario } from "../../modelos/MisInterfaces";

export const RegistroSesion = () => {
  type miFormularioHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  let { nombreUsuario, correoUsuario, claveUsuario, dobleEnlace, objeto } =
    useFormulario<CrearUsuario>(new CrearUsuario("", "", ""));
    const navigate = useNavigate();
    const { actualizar } = useContext(ContextoUsuario) as propUsuario;

    // Función flecha para resetear variables y limpiar cajas del formulario
// *******************************************************************
const limpiarCajas = (formulario: HTMLFormElement) => {
  formulario.reset();
  
  objeto.nombreUsuario = "";
  objeto.correoUsuario = "";
  objeto.claveUsuario = "";
  
  formulario.nombreUsuario.value = "";
  formulario.correoUsuario.value = "";
  formulario.claveUsuario.value = "";
  
  formulario.classList.remove("was-validated");
  };
  
// Función flecha para presentar mensaje de error estilo toastify
// *******************************************************************
const mensajeError = () => {
	toast.error("No se puede crear el usuario. Correo o perfil incorrectos", {
	  position: "top-center",
	  autoClose: 5000,
	  hideProgressBar: false,
	  closeOnClick: true,
	  pauseOnHover: true,
	  draggable: true,
	  progress: undefined,
	  theme: "dark",
	});
};



  const procesarFormulario = async (fh: miFormularioHtml) => {
    fh.preventDefault();
    setEnProceso(true);

    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      // Código para crear el usuario consumiendo servicio del back y usando sha512
// *******************************************************************
  const claveCifrada = cifrado.sha512(objeto.claveUsuario);
  objeto.claveUsuario = claveCifrada;
  const resultado = await ServicioPublico.crearUsuario(objeto);
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
	mensajeError();
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
                          Crear cuenta
                        </h5>
                        <p className="text-center small">
                          Complete la siguiente información personal
                        </p>
                      </div>

                      <Form
                        noValidate
                        className="row g-3"
                        validated={enProceso}
                        onSubmit={procesarFormulario}
                      >
                        <div className="col-12">
                          <Form.Group controlId="nombreUsuario">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              name="nombreUsuario"
                              className="form-control"
                              value={nombreUsuario}
                              onChange={dobleEnlace}
                            />
                            <Form.Control.Feedback type="invalid">
                              Nombre es obligatorio
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

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
                          <Form.Group controlId="reClaveUsuario">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              name="reClaveUsuario"
                              className="form-control"
                              pattern={claveUsuario}
                            />
                            <Form.Control.Feedback type="invalid">
                              Contraseñas no coindicen
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Crear cuenta
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login">Clic aquí</Link>
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

