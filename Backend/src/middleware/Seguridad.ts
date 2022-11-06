import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Seguridad {
  public validar(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const miLlave = String(process.env.SECRETA);
        const tokenEntregado = req.headers.authorization?.split(" ")[1] as string;
        const misDatos = Jwt.verify(tokenEntregado, miLlave);
        req.body.datosUsuarios = misDatos;
        next();
      } catch (error) {
        res.status(401).json({ respuesta: "credencial falsificada" });
      }
    } else {
      res.status(401).json({ respuesta: "toma tu cachetada" });
    }
  }
}

const seguridad = new Seguridad();
export default seguridad;
