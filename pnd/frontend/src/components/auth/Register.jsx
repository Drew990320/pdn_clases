import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await register(formData);
    
    if (result.success) {
      setSuccess(result.message);
      // Limpiar formulario
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: ''
      });
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <ThemeToggle />
      
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">
            <i className="fas fa-user-plus me-2"></i>
            Crear Cuenta
          </h1>
          <p className="auth-subtitle">Únete a nuestra plataforma</p>
        </div>
        
        {/* Alert Messages */}
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle me-2"></i>
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            <span>{success}</span>
          </div>
        )}
        
        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              <i className="fas fa-id-card me-2"></i>
              Nombre Completo
            </label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              className="form-control" 
              placeholder="Ingresa tu nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <i className="fas fa-user me-2"></i>
              Nombre de Usuario
            </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="form-control" 
              placeholder="Elige un nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope me-2"></i>
              Correo Electrónico
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-control" 
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Contraseña
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-control" 
              placeholder="Crea una contraseña segura"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Procesando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Crear Cuenta
              </>
            )}
          </button>
        </form>
        
        {/* Links */}
        <div className="text-center mt-4">
          <p>
            ¿Ya tienes cuenta? 
            <a href="/login" className="auth-link">
              <i className="fas fa-sign-in-alt me-1"></i>
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
