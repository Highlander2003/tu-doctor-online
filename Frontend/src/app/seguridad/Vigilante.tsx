import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

type propsVigilante = { children?: any };

export const Vigilante = ({ children }: propsVigilante) => {
  if (localStorage.getItem("tokenMintic")) {
    const elToken = String(localStorage.getItem("tokenMintic"));
    try {
      jwtDecode(elToken);
    } catch {
      console.log("Error");
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};