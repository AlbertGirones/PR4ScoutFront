/* eslint-disable import/no-anonymous-default-export */
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth/';

const register = async (email, password, name, surname) => {
    try {
        const response = await axios.post(API_URL + 'register', {
            email,
            password,
            name,
            surname
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return jwtDecode(user.token);
    }
    return null;
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};
