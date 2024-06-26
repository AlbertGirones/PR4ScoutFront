import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../services/authService';
import logo from "../../img/logoPrincipal.png"
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            navigate('/');
        } catch (err) {
            toast.error('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    return (
        <div className='flexContainerLogin'>
            <div className='formContainer'>
                <form onSubmit={handleLogin}>
                    <h1 className='h1Hame'>LOG IN</h1>
                    <div className='inputContainer'>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <button type="submit">Iniciar sesión</button>
                    </div>
                    <Link to="/register">
                        <p className='Link'>¿No tienes una cuenta? Registrate!</p>
                    </Link>
                </form>
            </div>
            <div className='formContainer'>
                <img src={logo} alt="Logo" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
