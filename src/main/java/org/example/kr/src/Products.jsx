import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, OverlayTrigger, Tooltip, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faChartBar, faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import './ProductList.css';
import AboutAuthor from './AboutAuthor';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        providerId: 0,
        address: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [providerInfo, setProviderInfo] = useState(null);
    const [showProviderModal, setShowProviderModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAboutModal, setShowAboutModal] = useState(false); // Состояние для модального окна об авторе
    const [priceStats, setPriceStats] = useState({ average: 0, max: 0, min: 0 });
    const [showPriceStatsModal, setShowPriceStatsModal] = useState(false);

    const fetchProducts = () => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
                setPriceStats(calculatePrices(response.data)); // Обновляем статистику цен
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching products: ' + error.message);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const calculatePrices = (products) => {
        if (products.length === 0) return { average: 0, max: 0, min: 0 };

        const prices = products.map(product => parseFloat(product.price)).filter(price => !isNaN(price));

        const average = (prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(2);
        const max = Math.max(...prices).toFixed(2);
        const min = Math.min(...prices).toFixed(2);

        return { average, max, min };
    };

    const handleAddOrEditProduct = (e) => {
        e.preventDefault();
        if (editingProduct) {
            axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, newProduct)
                .then(response => {
                    setProducts(products.map(product => product.id === editingProduct.id ? response.data : product));
                    setPriceStats(calculatePrices([...products, response.data])); // Обновляем статистику
                    resetForm();
                })
                .catch(error => {
                    console.error(error);
                    setError('Error updating product: ' + error.message);
                });
        } else {
            axios.post('http://localhost:8080/api/products', newProduct)
                .then(response => {
                    fetchProducts();
                    setPriceStats(calculatePrices([...products, response.data])); // Обновляем статистику
                    resetForm();
                })
                .catch(error => {
                    console.error(error);
                    setError('Error adding product: ' + error.message);
                });
        }
    };

    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:8080/api/products/${id}`)
            .then(() => {
                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts);
                setPriceStats(calculatePrices(updatedProducts));
            })
            .catch(error => {
                console.error(error);
                setError('Error deleting product: ' + error.message);
            });
    };

    const resetForm = () => {
        setNewProduct({ name: '', description: '', price: '', providerId: 0, address: '' });
        setEditingProduct(null);
        setShowForm(false);
    };

    const fetchProviderInfoByName = (providerId) => {
        axios.get(`http://localhost:8080/api/providers/${providerId}`)
            .then(response => {
                setProviderInfo(response.data);
                setShowProviderModal(true);
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching provider information: ' + error.message);
            });
    };

    const startEditing = (product) => {
        setNewProduct(product);
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isValidInput = (value, type) => {
        if (type === 'text') {
            return /^[a-zA-Zа-яА-ЯёЁ0-9.\s]*$/.test(value);
        }
        if (type === 'number') {
            return /^\d*\.?\d*$/.test(value);
        }
        return true;
    };

    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Price',
                data: products.map(product => product.price),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.price.toString().includes(query) ||
            (product.provider && product.provider.name.toLowerCase().includes(query)) ||
            product.address.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <h2 className="text-center">Products</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Provider</th>
                    <th>Address</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button
                                    variant="link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetchProviderInfoByName(product.providerId);
                                    }}
                                >
                                    {product.provider ? product.provider.name : 'Information about Provider'}
                                </Button>
                            </td>
                            <td>{product.address}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        startEditing(product);
                                    }}
                                    size="sm"
                                    className="me-2"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteProduct(product.id);
                                    }}
                                    size="sm"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">No products found</td>
                    </tr>
                )}

                {showForm && (
                    <tr>
                        <td></td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                name="name"
                                value={newProduct.name}
                                onChange={(e) => {
                                    if (isValidInput(e.target.value, 'text')) {
                                        handleInputChange(e);
                                    }
                                }}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                name="description"
                                value={newProduct.description}
                                onChange={(e) => {
                                    if (isValidInput(e.target.value, 'text')) {
                                        handleInputChange(e);
                                    }
                                }}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                name="price"
                                value={newProduct.price}
                                onChange={(e) => {
                                    if (isValidInput(e.target.value, 'number')) {
                                        handleInputChange(e);
                                    }
                                }}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                placeholder="Enter provider ID"
                                name="providerId"
                                value={newProduct.providerId}
                                onChange={(e) => {
                                    if (isValidInput(e.target.value, 'number')) {
                                        handleInputChange(e);
                                    }
                                }}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter delivery address"
                                name="address"
                                value={newProduct.address}
                                onChange={(e) => {
                                    if (isValidInput(e.target.value, 'text')) {
                                        handleInputChange(e);
                                    }
                                }}
                                required
                            />
                        </td>
                        <td>
                            <Button variant="primary" onClick={handleAddOrEditProduct}>
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* Поле ввода для поиска на всю ширину страницы */}
            <div className="mb-5">
                <div><br/></div>
                <InputGroup className="search-bar">
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search by any parameter..."
                        value={searchQuery}
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchQuery(e.target.value);
                        }}
                    />
                </InputGroup>
            </div>

            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="tooltip-left">Add Product</Tooltip>}
            >
                <Button
                    variant="success"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowForm(!showForm);
                    }}
                    className="mb-3"
                    style={{ position: 'absolute', bottom: '20px', right: '20px', borderRadius: '50%' }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </OverlayTrigger>

            <Button
                variant="info"
                onClick={(e) => {
                    e.preventDefault();
                    setShowChart(true);
                }}
                className="mb-3"
                style={{ position: 'absolute', bottom: '80px', right: '20px', borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faChartBar} />
            </Button>

            {/* Кнопка для отображения информации об авторе */}
            <Button
                variant="light"
                onClick={(e) => {
                    e.preventDefault();
                    setShowAboutModal(true);
                }}
                className="mb-3"
                style={{ position: 'absolute', bottom: '140px', right: '20px', borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </Button>

            <Modal show={showChart} onHide={() => setShowChart(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Prices Chart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Bar data={chartData} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowChart(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showProviderModal} onHide={() => setShowProviderModal(false)}>
                <Modal.Body>
                    {providerInfo ? (
                        <div>
                            <h5>Name: {providerInfo.name}</h5>
                            <p>Description: {providerInfo.detaiils}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProviderModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Модальное окно для отображения статистики цен */}
            <Button
                variant="info"
                onClick={(e) => {
                    e.preventDefault();
                    setShowPriceStatsModal(true);
                }}
                className="mb-3"
                style={{ position: 'absolute', bottom: '200px', right: '20px', borderRadius: '50%' }}
            >
                Price Statistics
            </Button>

            <Modal show={showPriceStatsModal} onHide={() => setShowPriceStatsModal(false)}>
                <Modal.Body>
                    <p>Average Price: {priceStats.average}</p>
                    <p>Maximum Price: {priceStats.max}</p>
                    <p>Minimum Price: {priceStats.min}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPriceStatsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <AboutAuthor show={showAboutModal} handleClose={() => setShowAboutModal(false)} />
        </div>
    );
};

export default ProductList;


