import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import Home from './Home'
import Profile from './Profile'
import Admin from './Admin';
import AdminUsers from './AdminUsers';

const URL = "http://localhost:8000/"

function Principal({mode}) {

    const [user, setUser] = useState("");
    const [showOptionsUser, setShowOptionsUser] = useState(false);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const email = localStorage.getItem('saveEmail');
        if (email) {
            const response = await axios.get(`${URL}${email}`);	
            if (response.status === 200) {
                setUser(response.data);
            }
        }
    }
    useEffect(() => {
        fetchUserData();
    }, [])

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    let modeStatus = {
        home: true ? mode === "" : false,
        profile: true ? mode === "profile" : false,
        admin: true ? mode === "admin" : false,
        adminUsers: true ? mode === "adminUsers" : false,
        adminProducts: true ? mode === "adminProducts" : false,
        adminProfits: true ? mode === "adminProfits" : false,
        adminShipments: true ? mode === "adminShipments" : false
    }

    return (
    <div className='principal flex'>

    <header className='flex'>

        <Link to={user && user.role === 'admin' ? '/admin' : '/'} className='flex principalBtn'>
            <img className='logo' src="/eco.png" alt="Icono Ecomercado" />
            <h1>EcoMercado</h1>
        </Link>

        {(!user || user.role === 'client') && 
        <form className='flex'>
            <input type="text" placeholder='Busca lo que quieras'/>
            <button type='submit' className='flex'>
                <IoIosSearch className='icon'/>
            </button>
        </form>
        }

        <div className='flex'>
        {user ? (
            <button 
                className='btn btnLogin'
                onMouseEnter={() => setShowOptionsUser(true)}
                onMouseLeave={() => setShowOptionsUser(false)}
            >
                {user.email}
            </button>
        ) : (
            <Link className='btn btnLogin' to="/login">Inicia sesion o registrate</Link>
        )}
        {showOptionsUser && (
            <div 
                className='optionsUser flex'
                onMouseEnter={() => setShowOptionsUser(true)}
                onMouseLeave={() => setShowOptionsUser(false)}
            >
                <Link to="/profile">Mi perfil</Link>
                {user.role === "client" && <Link to="/publish">Publicar</Link>}
                {user.role === "client" && <Link to="/profileSales">Mis ventas</Link>}
                {user.role === "client" && <Link to="/profilePurchases">Mis compras</Link>}
                <Link onClick={handleLogout}>Cerrar sesion</Link>
            </div>
        )}
        </div>

    </header>

    {modeStatus.home && (
        <Home/>
    )}

    {modeStatus.profile && (
        <Profile 
            user={user}
        />
    )}

    {modeStatus.admin && (
        <Admin/>
    )}

    {modeStatus.adminUsers && (
        <AdminUsers/>
    )}

    {(!user || user.role === 'client') &&
    <footer className='flex'>  
        <div className='flex'>
        <a href="">Trabaja con nosotros</a>
        <a href="">Privacidad</a>
        <a href="">Ayuda</a>
        </div>
        <p>Copyright © 2024 EcoMercado Colombia LTDA.</p>
        <p>Carrera ## Numero #### Bogota D.C. Colombia</p>
    </footer>
    }

    </div>
  )
}

export default Principal