export const Bienvenida = () => {
    return (
      <main id="main" className="main">
        <div className="col-lg-11 mx-auto p-4 py-md-5">
          <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
            <i
              className="fa-solid fa-biohazard fa-2xl"
              style={{ color: "#bd080a" }}
            ></i>
            <span className="fs-4">Bienvenido al sistema</span>
          </header>
  
          <main>
            <h1>Plantilla para desarrollo Fullstack</h1>
            <p className="fs-5">
              Esta plantilla está basada en NiceAdmin, utiliza Bootstrap 5.2.2 lo
              cual la convierte en una plantilla actual para realizar desarrollos
              SPA con React.
              <br />
              <small className="text-danger">
                Es importante no utilizar plantillas con versiones anteriores a
                bootstrap 5.
              </small>
            </p>
  
            <div className="mb-5">
              <a
                href="https://bootstrapmade.com/demo/NiceAdmin/"
                className="btn btn-primary btn-sm px-4"
                target="_blank"
                rel="noreferrer"
              >
                Descargar plantilla de referencia
              </a>
            </div>
  
            <hr className="col-3 col-md-2 mb-5" />
  
            <div className="row g-5">
              <div className="col-md-6">
                <h2>Frontend</h2>
                <p>
                  El frontend es la parte del desarrollo Web que se presenta al
                  usuario final, es el diseño que se visualiza en un navegador o
                  cualquier otro dispositivo.
                  <br />
                  Esta es una aplicación SPA (Single Page Application) la cual
                  carga todo en una sola página, esto hace la plataforma mucho más
                  rápida.
                </p>
              </div>
  
              <div className="col-md-6">
                <h2>Backend</h2>
                <p>
                  Es la capa de acceso a los datos. En desarrollo software existe
                  el concepto de componente agnóstico, esto quiere decir que un
                  Backend puede conectarse a cualquier frontend y viceversa
                  independientemente de la tecnología en la que estén
                  desarrollados.
                </p>
              </div>
            </div>
          </main>
        </div>
      </main>
    );
  };