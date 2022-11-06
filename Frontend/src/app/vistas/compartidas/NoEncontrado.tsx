import { useNavigate } from "react-router-dom";

import imagenNoEncontrado from "../../../assets/image/ops.png";

export const NoEncontrado = () => {
  const regresar = useNavigate();
  return (
    <div>
      <main>
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>
              El recurso que está solicitando <strong>NO</strong> existe
            </h2>
            <button onClick={() => regresar(-1)} className="btn btn-info">
              Regresar
            </button>
            <img
              src={imagenNoEncontrado}
              className="img-fluid py-5"
              alt="Page Not Found"
            />
          </section>
      </main>
    </div>
  );
};
