import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { MdMarkEmailRead } from 'react-icons/md'
import { AiOutlineSwapRight } from 'react-icons/ai'
import InputLogin from '../components/InputLogin'
import { isPasswordSecure } from '../utils/isPasswordSecure'

const URL = "http://localhost:8000/"

function AuthLogin({mode}) {
  
  const [saveEmail, setSaveEmail] = useState("");
  const [email, setEmail] = useState("")
  const [confirmNum, setConfirmNum] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    const savedEmail = localStorage.getItem('saveEmail');
    if (savedEmail) {
      setSaveEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    setMessage("");
  }, [location]);

  let modeStatus = {
    login: true ? mode === "login" : false,
    registerEmail: true ? mode === "registerEmail" : false,
    confirmEmail: true ? mode === "confirmEmail" : false,
    registerPassword: true ? mode === "registerPassword" : false,
    forgotPassword: true ? mode === "forgotPassword" : false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response;
      //iniciar sesion
      if (modeStatus.login) {
        response = await axios.post(`${URL}login`, {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          localStorage.setItem('saveEmail', email);
          if (response.data === "client") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        }
      } 
      //registrar correo nuevo
      else if (modeStatus.registerEmail) {
        response = await axios.post(`${URL}registerEmail`, {
          email: email,
        });
        if (response.status === 200) {
          localStorage.setItem('testEmail', email);
          navigate("/confirmEmail");
        } else {
          setMessage(response.data.message);
        }
      } 
      //codigo de verificacion
      else if (modeStatus.confirmEmail) {
        const regex = /^\d{6}$/;
        if (regex.test(confirmNum)) {
          navigate("/registerPassword");
        } else {
          setMessage("Numero incorrecto");
        }
      } 
      //registrar contraseña
      else if (modeStatus.registerPassword) {
        const passwordSecure = isPasswordSecure(password);
        if (passwordSecure.secure) {
          if (password === confirmPassword) {
            //cambiar contraseña de correo logeado
            if (saveEmail) {
              response = await axios.patch(`${URL}changePassword`, {
                email: saveEmail,
                password: password
              });
              if (response.status === 200) {
                navigate("/profile");
              }
            } 
            //cambiar contraseña de correo no logeado
            else if (localStorage.getItem("testEmailForgotPassword")) {
              const Email = localStorage.getItem("testEmailForgotPassword");
              response = await axios.patch(`${URL}changePassword`, {
                email: Email,
                password: password
              });
              if (response.status === 200) {
                localStorage.setItem("saveEmail", Email);
                localStorage.removeItem("testEmailForgotPassword");
                navigate("/");
              }
            }
            // crear nuevo usuario
            else {
              response = await axios.post(`${URL}registerPassword`, {
                email: localStorage.getItem("testEmail"),
                password: password
              });
              if (response.status === 200) {
                localStorage.setItem("saveEmail", localStorage.getItem("testEmail"));
                navigate("/");
              }
            }
          } else {
            setMessage("Las contraseñas no coinciden");
          }
        } else {
          setMessage(passwordSecure.message);
        }
      
      }
      //ingresar correo para recuperar contraseña
      else if (modeStatus.forgotPassword) {
        response = await axios.post(`${URL}forgotPassword`, {
          email: email,
        });
        if (response.status === 200) {
          localStorage.setItem('testEmailForgotPassword', email);
          navigate("/confirmEmail");
        } else {
          setMessage(response.data.message);
        }
      }

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error de servidor");
      }
    }
  }
  
  return (
    <div className='loginPage flex'>
    <div className="container flex">

        <div className="leftDiv flex">

          <Link className="headerDiv flex" to={"/"}>
            <img src="eco.png" alt="Icono Ecomercado"/>
            <h1>EcoMercado</h1>
          </Link>

          <div className="textDiv flex">
            <h1>Compra y vende articulos extraordinarios</h1>
            <p>Adopta la nueva generacion de productos sostenibles</p>
          </div>

          {saveEmail ? (
            <div className="footerDiv flex">
              <span className='text'>Correo registrado {saveEmail}</span>
            </div>
          ) : (
            <div className="footerDiv flex">
              <span className='text'>{modeStatus.login ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</span>
              <Link to={modeStatus.login ? "/registerEmail" : "/login"}>
              <button className='btn' onClick={() => localStorage.clear()}>
                {modeStatus.login ? "Registrate" : "Inicia sesion"}
              </button>
              </Link>
            </div>
          )}

        </div>

        <form onSubmit={handleSubmit} className='flex'>

          <span className={message ? "showMessage" : "hiddenMessage"}>
            {message}
          </span>
          
          {/* input correo */}
          {(modeStatus.login || modeStatus.registerEmail || modeStatus.forgotPassword) && (
            <InputLogin
              label="Correo"
              icon={<MdMarkEmailRead className="icon"/>}
              type="email"
              placeholder="Ingrese su correo"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {/* input contraseña */}  
          {(modeStatus.login || modeStatus.registerPassword) && (
            <InputLogin
              label="Contraseña"
              icon={<BsFillShieldLockFill className="icon"/>}
              type="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {/* input codigo de confirmacion */}
          {(modeStatus.confirmEmail) && (
            <InputLogin
              label="Ingrese el codigo de verificacion enviado al correo registrado"
              onChange={(e) => setConfirmNum(e.target.value)}
            />
          )}

          {/* input confirmar contraseña */}
          {modeStatus.registerPassword && (
            <InputLogin
              label="Confirmar contraseña"
              icon={<BsFillShieldLockFill className="icon"/>}
              type="password"
              placeholder="Confirme su contraseña"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button type='submit' className='btn flex'>
            <span>{modeStatus.login ? "Iniciar sesión" : modeStatus.registerPassword ? "Finalizar" : "Continuar"}</span>
            <AiOutlineSwapRight className='icon'/>
          </button>

          {/* link olvido contraseña */}
          {modeStatus.login && (
            <Link to={"/forgotPassword"}>¿Olvidaste la contraseña? Click aquí</Link>
          )}

        </form>

    </div>
    </div>
  )
}

export default AuthLogin