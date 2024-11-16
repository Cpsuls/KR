import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './Products.jsx';
import Auth from './Auth';
import AdminPage from './AdminPage'; // Импортируйте компонент AdminPage

const App = () => {
  const isAdmin = true; // Замените это условие на вашу логику проверки прав доступа

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<ProductList />} />
          <Route
              path="/admin"
              element={isAdmin ? <AdminPage /> : <Navigate to="/auth" />} // Проверка прав доступа
          />
        </Routes>
      </Router>
  );
};

export default App;

