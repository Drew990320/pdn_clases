import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { forgotPassword } = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await forgotPassword(email);
    
    if (result.success) {
      setSuccess(result.message);
      setEmail('');
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
            <i className="fas fa-key me-2"></i>
            Recuperar Contraseña
          </h1>
          <p className="auth-subtitle">Ingresa tu email para recibir un enlace de recuperación</p>
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
        
        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Ingresa tu email registrado"
              value={email}
              onChange={handleChange}
              required
              autoComplete="email"
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
                <i className="fas fa-paper-plane me-2"></i>
                Enviar Enlace de Recuperación
              </>
            )}
          </button>
        </form>
        
        {/* Links */}
        <div className="text-center mt-4">
          <p>
            ¿Recordaste tu contraseña? 
            <a href="/login" className="auth-link">
              <i className="fas fa-sign-in-alt me-1"></i>
              Inicia sesión aquí
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
        
        {/* Info Box */}
        <div className="mt-4 p-3" style={{background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
          <h6 className="mb-2" style={{color: 'var(--text-primary)'}}>
            <i className="fas fa-info-circle me-2"></i>
            Información Importante
          </h6>
          <ul className="mb-0" style={{color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px'}}>
            <li>El enlace de recuperación será válido por 1 hora</li>
            <li>Revisa tu carpeta de spam si no recibes el email</li>
            <li>El token se mostrará en la consola del servidor para pruebas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
