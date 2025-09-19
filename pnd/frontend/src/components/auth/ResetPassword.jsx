import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token de recuperación no válido');
    }
  }, [searchParams]);

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

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    const result = await resetPassword(token, formData.password, formData.confirmPassword);
    
    if (result.success) {
      setSuccess(result.message);
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
            <i className="fas fa-lock me-2"></i>
            Nueva Contraseña
          </h1>
          <p className="auth-subtitle">Ingresa tu nueva contraseña</p>
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
        
        {/* Reset Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Nueva Contraseña
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-control" 
              placeholder="Ingresa tu nueva contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <small className="form-text" style={{color: 'var(--text-secondary)'}}>
              Mínimo 6 caracteres
            </small>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Confirmar Contraseña
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              className="form-control" 
              placeholder="Confirma tu nueva contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !token}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Procesando...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Actualizar Contraseña
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
        </div>
        
        {/* Password Requirements */}
        <div className="mt-4 p-3" style={{background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
          <h6 className="mb-2" style={{color: 'var(--text-primary)'}}>
            <i className="fas fa-shield-alt me-2"></i>
            Requisitos de Contraseña
          </h6>
          <ul className="mb-0" style={{color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px'}}>
            <li>Mínimo 6 caracteres</li>
            <li>Se recomienda usar mayúsculas y minúsculas</li>
            <li>Incluir números y símbolos especiales</li>
            <li>No usar información personal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
