import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password, address, role: 'USER' };

        setLoading(true);
        setError(null);

        try {
            const response = isRegistering
                ? await axios.post('http://localhost:8080/api/users', user)
                : await axios.post('http://localhost:8080/api/users/login', user);

            console.log(response.data);

            if (response.status === 200) {
                if (response.data.role === 'ADMIN') {
                    navigate("/admin");
                } else {
                    navigate("/products");
                }
            }
        } catch (err) {
            console.error(err);
            if (err.response) {
                if (err.response.status === 404) {
                    setError('Пользователь не найден. Пожалуйста, проверьте свои учетные данные.');
                } else if (err.response.status === 401) {
                    setError('Неверный логин или пароль. Попробуйте еще раз.');
                } else {
                    setError(err.response.data || 'Произошла ошибка. Попробуйте еще раз.');
                }
            } else {
                setError('Произошла ошибка. Попробуйте еще раз.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && (
                <div className="loading-message">
                    <Spinner animation="border" size="sm" />
                    <span> Подождите, пожалуйста...</span>
                </div>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </Form.Group>

                {isRegistering && (
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="input-field"
                        />
                    </Form.Group>
                )}

                <div className="button-group">
                    <Button variant="primary" type="submit" disabled={loading} className="submit-button">
                        {loading ? <Spinner animation="border" size="sm" /> : (isRegistering ? 'Register' : 'Login')}
                    </Button>
                    <Button onClick={() => setIsRegistering(!isRegistering)} disabled={loading} className="toggle-button">
                        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Auth;


