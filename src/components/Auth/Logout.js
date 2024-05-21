import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            await authService.logout();
            navigate('/login');
        };

        handleLogout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
