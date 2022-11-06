import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import { useState } from "react";
import Perfil from "../../../modelos/Perfil";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import ApiBack from "../../../utilidades/dominios/ApiBack";
import { useFormulario } from "../../../utilidades/misHooks/useFormulario";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const PerfilCrear = () => {
  // Variables
  type miFormularioHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  let { nombrePerfil, estadoPerfil, dobleEnlace, objeto } =
    useFormulario<Perfil>(new Perfil("", "", 0));
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto._id = "";
    objeto.nombrePerfil = "";
    objeto.estadoPerfil = 0;

    formulario.nombrePerfil.value = "";
    formulario.estadoPerfil.value = "";

    formulario.classList.remove("was-validated");
  };

  const enviarFormulario = async (fh: miFormularioHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const resultado = await ServicioPrivado.peticionPOST(
        ApiBack.PERFILES_CREAR,
        objeto
      );

      if (resultado.id) {
        setEnProceso(false);
        MensajeToastify("success", "Perfil creado con éxito", 6000);
      } else {
        MensajeToastify(
          "error",
          "No se puede crear el Perfil. Es posible que el nombre utilizado exista en la BD",
          6000
        );
      }

      limpiarCajas(formulario);
    }
  };

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Perfiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Crear perfil</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
              <Form.Group as={Row} className="mb-3" controlId="nombrePerfil">
                <Form.Label column sm={2}>
                  Nombre perfil
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    name="nombrePerfil"
                    className="form-control"
                    value={nombrePerfil}
                    onChange={dobleEnlace}
                  />
                  <Form.Control.Feedback type="invalid">
                    Nombre del perfil es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="estadoPerfil">
                <Form.Label column sm={2}>
                  Estado perfil
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    required
                    name="estadoPerfil"
                    value={estadoPerfil}
                    onChange={dobleEnlace}
                  >
                    <option value="">Seleccione el estado</option>
                    <option value={1}>Activo</option>
                    <option value={2}>Inactivo</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Seleccione el estado del perfil
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Crear perfil</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {/* Ejemplo de formulario: Inicio */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
