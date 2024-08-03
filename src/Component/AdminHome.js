// src/AdminHome.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import {jwtDecode} from 'jwt-decode';

const AdminHome = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000 - Date.now();

        if (expirationTime <= 0) {
            localStorage.removeItem('accessToken');
            navigate('/login');
        } else {
            setTimeout(() => {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }, expirationTime);
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <Search />
        </>
    );
};

export default AdminHome;
