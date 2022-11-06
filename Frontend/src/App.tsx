import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RuteoCompleto } from "./app/utilidades/rutas/RuteoCompleto";

const cargando = (
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={cargando}>
          <RuteoCompleto />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

