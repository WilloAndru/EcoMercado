import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function AuthLogin() {
  const [error, setError] = useState(""); // Error que se le mostrara al usuario
  const navigate = useNavigate();

  // Funcion que maneja el inicio de sesion o registro
  const handleLoginGoogle = async ({ credential }) => {
    try {
      // Si OAuth 2.0 devulve un token vacio
      if (!credential) throw new Error("Credentials empty.");

      const res = await axios.post(`${URL}/registerGoogle`, {
        token: credential,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Redirigimos al panel de client o admin
        const role = res.data.userRole;
        navigate(role === "client" ? "/" : "/admin");
        return;
      }

      // Si el server responde con algo que no es un token
      throw new Error("Invalid server response.");
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="container flex">
        {/* Seccion izquierda */}
        <div className="leftDiv flex">
          {/* Marca */}
          <Link className="headerDiv flex" to="/">
            <img src="icon.png" alt="Icon" />
            <h1>EcoMercado</h1>
          </Link>
          {/* Texto */}
          <div className="textDiv flex">
            <h1>Buy and Sell Extraordinary Items</h1>
            <p>Embrace the New Generation of Sustainable Products</p>
          </div>
        </div>
        {/* Seccion derecha */}
        <form className="flex">
          {/* Titulo */}
          <div className="div1 flex">
            <h2>Login or Sign Up</h2>
            <p>Use your email or another service to access EcoMercado.</p>
          </div>
          {/* Mensaje de error */}
          <span className={error ? "showerror" : "hiddenerror"}>{error}</span>
          {/* Boton de google */}
          <GoogleLogin
            onSuccess={handleLoginGoogle}
            onError={(error) => {
              console.log("Login Failed", error);
              setError(error);
            }}
          />
          {/* Terminos y condiciones */}
          <p>
            By continuing, you agree to EcoMercado's Terms and Conditions of
            use.
          </p>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthLogin;
