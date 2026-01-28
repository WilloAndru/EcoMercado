import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
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
      <form className="flex items-center flex-col px-10 gap-10 justify-center">
        {/* Titulo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-center">Login or Sign Up</h2>
          <p>Use your email or another service to access EcoMercado.</p>
        </div>
        {/* Mensaje de error */}
        {error && (
          <span className={error ? "showerror" : "hiddenerror"}>{error}</span>
        )}
        {/* Boton de google */}
        <GoogleLogin
          onSuccess={handleLoginGoogle}
          onError={(error) => {
            setError(error);
          }}
        />
        {/* Terminos y condiciones */}
        <p>
          By continuing, you agree to EcoMercado's Terms and Conditions of use.
        </p>
      </form>
    </GoogleOAuthProvider>
  );
}

export default AuthLogin;
