import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import InputLogin from "../../components/InputLogin";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const URL = import.meta.env.VITE_REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function AuthLogin({ mode }) {
  const [email, setEmail] = useState("");
  const [confirmNum, setConfirmNum] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
  }, [location]);

  let modeStatus = {
    default: true ? mode === "default" : false,
    enterEmail: true ? mode === "enterEmail" : false,
    codeVerification: true ? mode === "codeVerification" : false,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (modeStatus.default) {
        navigate("/enterEmail");
      } else if (modeStatus.enterEmail) {
        response = await axios.post(`${URL}/sendEmail`, { email: email });
        if (response.status === 200) {
          localStorage.setItem("testEmail1", email);
          navigate("/codeVerification");
        }
      } else if (modeStatus.codeVerification) {
        const savedEmail = localStorage.getItem("testEmail1");
        response = await axios.post(`${URL}/validateCode`, {
          email: savedEmail,
          code: confirmNum,
        });
        localStorage.setItem("testEmail1", email);
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.removeItem("testEmail1");
          response.data.userRole === "client"
            ? navigate("/")
            : navigate("/admin");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error from server");
      }
    }
  };

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
      <div className="loginPage flex">
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

          <form onSubmit={handleSubmit} className="flex">
            <div className="div1 flex">
              <h2>Log In or Sign Up</h2>
              <p>Use your email or another service to access EcoMercado.</p>
            </div>

            <span className={message ? "showMessage" : "hiddenMessage"}>
              {message}
            </span>

            {modeStatus.default && (
              <div className="div1 flex">
                <GoogleLogin
                  onSuccess={(jwt) => {
                    handleLoginGoogle(jwt);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            )}

            {modeStatus.enterEmail && (
              <InputLogin
                label="Email"
                icon={<MdMarkEmailRead className="icon" />}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            {modeStatus.codeVerification && (
              <InputLogin
                label="Enter the verification code sent to your email."
                onChange={(e) => setConfirmNum(e.target.value)}
              />
            )}

            {/* <button type='submit' className='btn flex'>{modeStatus.default ? 'Enter your email' : 'Continue'}</button> */}

            <label>
              By continuing, you agree to EcoMercado's Terms and Conditions of
              Use.
            </label>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthLogin;
