import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await authService.register(email, password, name, surname);
            setMessage('Usuario registrado exitosamente');
            navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        } catch (error) {
            setMessage('Error al registrar el usuario');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <button type="submit">Registrarse</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default Register;
