import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../services/authService';
import logo from "../../img/logoPrincipal.png";
import "./register.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await authService.register(email, password, name, surname);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('El correo ya está en uso.');
            } else {
                toast.error('Error al registrarse. Modifica las credenciales.');
            }
        }
    };

    return (
        <div className='flexContainerLogin'>
            <div className='formContainer'>
                <form onSubmit={handleRegister}>
                    <h1 className='h1Hame'>REGISTER</h1>
                    <div className='inputContainer'>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <label>Apellido</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                    <div className='inputContainer'>
                        <button type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
            <div className='formContainer'>
                <img src={logo} alt="Logo" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
