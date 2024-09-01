import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import Home from './Home'
import Profile from './Profile'
import Admin from './Admin';
import AdminUsers from './AdminUsers';
import AdminProducts from './AdminProducts';
import AdminTransactions from './AdminTransactions';
import AdminDatas from './AdminDatas';
import Search from './Search';
import ViewProduct from './ViewProduct';
import BuyProduct from './BuyProduct';
import ShoppingCart from './ShoppingCart';
import PublishProduct from './PublishProduct';
import ProfilePurchases from './ProfilePurchases';
import EditSales from './EditSales';
import ProfileSales from './ProfileSales';

const URL = process.env.REACT_APP_API_URL;

function Principal({ mode }) {

    const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
    const [user, setUser] = useState(null);
    const [showOptionsUser, setShowOptionsUser] = useState(false);
    const [input, setInput] = useState("");
    const [showProducts, setShowProducts] = useState(false);
    const [productsIdNames, setProductsIdNames] = useState([]);
    const [productsFilter, setProductsFilter] = useState([]);
    const navigate = useNavigate();
    const blurTimeout = useRef(null);

    let modeStatus = {
        home: true ? mode === "" : false,
        profile: true ? mode === "profile" : false,
        admin: true ? mode === "admin" : false,
        adminUsers: true ? mode === "adminUsers" : false,
        adminProducts: true ? mode === "adminProducts" : false,
        adminTransactions: true ? mode === "adminTransactions" : false,
        adminDatas: true ? mode === "adminDatas" : false,
        search: true ? mode === "search" : false,
        product: true ? mode === "product" : false,
        buyProduct: true ? mode === "buyProduct" : false,
        shoppingCart: true ? mode === "shoppingCart" : false,
        publishProduct: true ? mode === "publishProduct" : false,
        editSales: true ? mode === "editSales" : false,
        profileSales: true ? mode === "profileSales" : false,
        profilePurchases: true ? mode === "profilePurchases" : false,
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${URL}/getUserDatas`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            if (!modeStatus.admin) {
                const response = await axios.get(`${URL}/productsIdNames`);
                if (response.status === 200) {
                    setProductsIdNames(response.data);
                }
            }
        }
        fetchData();
    }, [])

    const fetchNamesProducts = async (value) => {
        const valueMin = value.toLowerCase();
        const filterProducts = productsIdNames.filter(p => p.name.toLowerCase().includes(valueMin))
        setProductsFilter(filterProducts)
    }

    const handleInputChange = (value) => {
        setInput(value);
        fetchNamesProducts(value)
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const handleInputBlur = () => {
        blurTimeout.current = setTimeout(() => {
            setShowProducts(false);
        }, 100);
    };

    const goSearchInterface = async (e) => {
        e.preventDefault();
        input ? localStorage.setItem('valueInput', input) : localStorage.removeItem('valueInput');
        if (input || localStorage.getItem('valueInput')) {
            setShowProducts(false);
            window.location.href = "/search";
        }
    }

    return (
        <div className='principal flex'>

            <header className='flex'>

                <Link to={user && user.role === 'admin' ? '/admin' : '/'} className='flex principalBtn'>
                    <img className='logo' src="/eco.png" alt="Icono Ecomercado" />
                    <h1>EcoMercado</h1>
                </Link>

                <div className='flex'>
                    {(!user || user.role === 'client') &&
                        <form className='flex' onSubmit={goSearchInterface}>
                            <input
                                className='input'
                                type="text"
                                placeholder='Busca lo que quieras'
                                value={input}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onFocus={() => setShowProducts(true)}
                                onBlur={handleInputBlur}
                            />
                            <button type='submit' className='flex'>
                                <IoIosSearch className='icon' />
                            </button>
                        </form>
                    }
                    {showProducts && (
                        <div className='suggestContainer flex'>
                            {productsFilter.slice(0, 10).map((product, id) => (
                                <Link key={id} to={`/product/${product.id}`}>{product.name}</Link>
                            ))}
                        </div>
                    )}
                </div>

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
                    {shoppingContext &&
                        <button className='btn btnCart flex' onClick={() => navigate("/shoppingCart")}>
                            <TiShoppingCart />
                            <span className='flex'>{shoppingContext.length}</span>
                        </button>
                    }
                    {showOptionsUser && (
                        <div
                            className='optionsUser flex'
                            onMouseEnter={() => setShowOptionsUser(true)}
                            onMouseLeave={() => setShowOptionsUser(false)}
                        >
                            {user.role === "client" && <Link to="/profile">Mi perfil</Link>}
                            {user.role === "client" && <Link to="/publishProduct/0">Publicar</Link>}
                            {user.role === "client" && <Link to="/editSales">Editar ventas</Link>}
                            {user.role === "client" && <Link to="/profileSales">Articulos vendidos</Link>}
                            {user.role === "client" && <Link to="/profilePurchases">Mis compras</Link>}
                            <Link onClick={handleLogout}>Cerrar sesion</Link>
                        </div>
                    )}
                </div>

            </header>

            {modeStatus.home && (
                <Home />
            )}

            {modeStatus.profile && (
                <Profile />
            )}

            {modeStatus.admin && (
                <Admin />
            )}

            {modeStatus.adminUsers && (
                <AdminUsers />
            )}

            {modeStatus.adminProducts && (
                <AdminProducts />
            )}

            {modeStatus.adminTransactions && (
                <AdminTransactions />
            )}

            {modeStatus.adminDatas && (
                <AdminDatas />
            )}

            {modeStatus.search && (
                <Search />
            )}

            {modeStatus.product && (
                <ViewProduct />
            )}

            {modeStatus.buyProduct && (
                <BuyProduct />
            )}

            {modeStatus.shoppingCart && (
                <ShoppingCart />
            )}

            {modeStatus.publishProduct && (
                <PublishProduct />
            )}

            {modeStatus.editSales && (
                <EditSales />
            )}

            {modeStatus.profileSales && (
                <ProfileSales />
            )}

            {modeStatus.profilePurchases && (
                <ProfilePurchases />
            )}

            {(!user || user.role === 'client') &&
                <footer className='flex'>
                    <p>Copyright © 2024 EcoMercado Colombia LTDA.</p>
                    <p>Carrera ## Numero #### Bogota D.C. Colombia</p>
                </footer>
            }

        </div>
    )
}

export default Principal