import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table, Spinner, Alert } from 'react-bootstrap';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newUser , setNewUser ] = useState({ username: '', password: '', address: '', role: 'USER' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser , setEditingUser ] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/users/all');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке пользователей.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser  = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isEditing) {
                // Если редактируем пользователя
                await axios.put(`http://localhost:8080/api/users/${editingUser .username}`, newUser );
                setIsEditing(false);
                setEditingUser (null);
            } else {
                // Если добавляем нового пользователя
                await axios.post('http://localhost:8080/api/users', newUser );
            }
            fetchUsers(); // Обновляем список пользователей
            resetForm(); // Сбрасываем форму
        } catch (err) {
            console.error(err);
            setError('Ошибка при добавлении/редактировании пользователя.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser  = async (username) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`http://localhost:8080/api/users?username=${username}`);
            fetchUsers(); // Обновляем список пользователей
        } catch (err) {
            console.error(err);
            setError('Ошибка при удалении пользователя.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser  = (user) => {
        setNewUser ({ username: user.username, password: '', address: user.address, role: user.role });
        setIsEditing(true);
        setEditingUser (user);
    };

    const resetForm = () => {
        setNewUser ({ username: '', password: '', address: '', role: 'USER' });
    };

    return (
        <div className="admin-container">
            <h2>Управление пользователями</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Spinner animation="border" />}
            <Form onSubmit={handleAddUser }>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={newUser .username}
                        onChange={(e) => setNewUser ({ ...newUser , username: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        value={newUser .password}
                        onChange={(e) => setNewUser ({ ...newUser , password: e.target.value })}
                        required={!isEditing} // Не требуется при редактировании
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите адрес"
                        value={newUser .address}
                        onChange={(e) => setNewUser ({ ...newUser , address: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        value={newUser .role}
                        onChange={(e) => setNewUser ({ ...newUser , role: e.target.value })}
                    >
                        <option value="USER">Пользователь</option>
                        <option value="ADMIN">Администратор</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {isEditing ? 'Сохранить изменения' : 'Добавить пользователя'}
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.address}</td>
                        <td>{user.role}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditUser (user)} disabled={loading}>
                                Редактировать
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteUser (user.username)} disabled={loading}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminPage;
