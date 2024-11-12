import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ProviderInfoModal = ({ providerId, show, onHide }) => {
    const [provider, setProvider] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (providerId) {
            axios.get(`http://localhost:8080/api/providers/${providerId}`)
                .then(response => {
                    setProvider(response.data);
                    setError(null);
                })
                .catch(error => {
                    console.error(error);
                    setError('Error fetching provider information: ' + error.message);
                });
        }
    }, [providerId]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Provider Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="text-danger">{error}</div>}
                {provider ? (
                    <div>
                        <h5>Name: {provider.name}</h5>
                        {/* Добавьте другие поля провайдера по желанию */}
                        <h6>Products:</h6>
                        <ul>
                            {provider.products && provider.products.map(product => (
                                <li key={product.id}>{product.name}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProviderInfoModal;

