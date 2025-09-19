import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si hay mensajes de la URL (logout exitoso, etc.)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const logoutMessage = urlParams.get('logout');
    const errorMessage = urlParams.get('error');
    
    if (logoutMessage) {
      setMessage('Has cerrado sesión exitosamente.');
    }
    if (errorMessage) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  }, [location]);

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
    setMessage('');

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
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
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar Sesión
          </h1>
          <p className="auth-subtitle">Accede a tu cuenta para continuar</p>
        </div>
        
        {/* Alert Messages */}
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle me-2"></i>
            <span>{error}</span>
          </div>
        )}
        
        {message && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            <span>{message}</span>
          </div>
        )}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Ingresa tu nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
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
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
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
                <i className="fas fa-sign-in-alt me-2"></i>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>
        
        {/* Links */}
        <div className="text-center mt-4">
          <p className="mb-2">
            <a href="/forgot-password" className="auth-link">
              <i className="fas fa-key me-1"></i>
              ¿Olvidaste tu contraseña?
            </a>
          </p>
          <p>
            ¿No tienes cuenta? 
            <a href="/register" className="auth-link">
              <i className="fas fa-user-plus me-1"></i>
              Regístrate aquí
            </a>
          </p>
        </div>
        
        {/* Demo Credentials */}
        <div className="mt-4 p-3" style={{background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
          <h6 className="mb-2" style={{color: 'var(--text-primary)'}}>
            <i className="fas fa-info-circle me-2"></i>
            Credenciales de Prueba
          </h6>
          <p className="mb-1" style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
            <strong>Usuario:</strong> admin
          </p>
          <p className="mb-0" style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
            <strong>Contraseña:</strong> admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
