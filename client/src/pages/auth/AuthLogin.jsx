import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const URL = import.meta.env.VITE_REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function AuthLogin() {
  const [message, setMessage] = useState("");

  const handleLoginGoogle = async (jwt) => {
    const token = jwt.credential;
    const res = await axios.post(`${URL}/registerGoogle`, { token });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      res.data.userRole === "client" ? navigate("/") : navigate("/admin");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="container flex">
        <div className="leftDiv flex">
          <Link className="headerDiv flex" to={"/"}>
            <img src="icon.png" alt="Icon" />
            <h1>EcoMercado</h1>
          </Link>

          <div className="textDiv flex">
            <h1>Buy and Sell Extraordinary Items</h1>
            <p>Embrace the New Generation of Sustainable Products</p>
          </div>
        </div>

        <form className="flex">
          <div className="div1 flex">
            <h2>Log In or Sign Up</h2>
            <p>Use your email or another service to access EcoMercado.</p>
          </div>

          <span className={message ? "showMessage" : "hiddenMessage"}>
            {message}
          </span>

          <GoogleLogin
            onSuccess={(jwt) => {
              handleLoginGoogle(jwt);
            }}
            onError={(error) => {
              console.log("Login Failed", error);
              setMessage(error);
            }}
          />

          <label>
            By continuing, you agree to EcoMercado's Terms and Conditions of
            Use.
          </label>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthLogin;
