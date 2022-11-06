import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Bienvenida } from "../../contenedores/Bienvenida";
import { AcercaDe } from "../../vistas/compartidas/AcercaDe";
import { NoEncontrado } from "../../vistas/compartidas/NoEncontrado";
import { PerfilActual } from "../../vistas/privadas/perfiles/PerfilActual";
import { PerfilAdmin } from "../../vistas/privadas/perfiles/PerfilAdmin";
import { PerfilCrear } from "../../vistas/privadas/perfiles/PerfilCrear";
import { PerfilListado } from "../../vistas/privadas/perfiles/PerfilListado";

// Carga Lazy - Supenso
// ***********************************************************************************************
const cargando = (
  <div className="d-flex justify-content-center">
    <div className="mt-3">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Cargando ...
      </button>
    </div>
  </div>
);
// ***********************************************************************************************

const RecursoNoEncontrado = lazy(() =>
  import("../../vistas/compartidas/NoEncontrado").then(() => ({
    default: NoEncontrado,
  }))
);
const LazyBienvenida = lazy(() =>
  import("../../contenedores/Bienvenida").then(() => ({ default: Bienvenida }))
);
const LazyAcercaDe = lazy(() => import("../../vistas/compartidas/AcercaDe").then(() => ({ default: AcercaDe, })) );

const LazyPerfilListado= lazy(() => import("../../vistas/privadas/perfiles/PerfilListado").then(() => ({ default: PerfilListado, })) );
const LazyPerfilCrear= lazy(() => import("../../vistas/privadas/perfiles/PerfilCrear").then(() => ({ default: PerfilCrear, })) );
const LazyPerfilAdmin= lazy(() => import("../../vistas/privadas/perfiles/PerfilAdmin").then(() => ({ default: PerfilAdmin, })) );
const LazyPerfilActual= lazy(() => import("../../vistas/privadas/perfiles/PerfilActual").then(() => ({ default: PerfilActual, })) );

export const RuteoTablero = () => {
  return (
    <Suspense fallback={cargando}>
      <Routes>
        <Route path="/" element={<LazyBienvenida />} />
        <Route path="/about" element={<LazyAcercaDe />} />

        <Route path="/listprofiles" element={<LazyPerfilListado />} />
        <Route path="/addprofile" element={<LazyPerfilCrear />} />
        <Route path="/admprofile" element={<LazyPerfilAdmin />} />
        <Route path="/updateprofile/:codigo" element={<LazyPerfilActual />} />

        <Route path="*" element={<RecursoNoEncontrado />} />
      </Routes>
    </Suspense>
  );
};
