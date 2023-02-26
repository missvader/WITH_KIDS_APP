import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

function PrivateRoute({children}){
  const { currentUser } = useContext(AuthContext);
  return currentUser !== null
    ? children
    : <Navigate to="/login/" replace />

}

export default PrivateRoute;