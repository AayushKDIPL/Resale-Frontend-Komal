import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        admin: '',
        password: ''
    });


    const jump=useNavigate();

    const [errors, setErrors] = useState({
        admin: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: value ? '' : 'This field is required'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.admin || !formData.password) {
            setErrors({
                admin: !formData.admin ? 'This field is required' : '',
                password: !formData.password ? 'This field is required' : ''
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ admin: formData.admin, password: formData.password })
            });
            const data = await response.json();
            if (data.message && data.message.accesstoken) {
                localStorage.setItem('accessToken', data.message.accesstoken);
                alert('Login successful!');
                jump("/");
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="admin" className="form-label">Admin</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.admin ? 'is-invalid' : ''}`}
                                        id="admin"
                                        name="admin"
                                        value={formData.admin}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.admin}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
