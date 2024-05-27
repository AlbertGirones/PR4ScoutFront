import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            navigate('/');
        } catch (err) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
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
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
            <div className='formContainer'>
                <img src=""></img>
            </div>
        </div>
        
    );
};

export default Login;
