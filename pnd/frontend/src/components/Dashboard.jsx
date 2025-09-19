import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-container">
      <ThemeToggle />
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="dashboard-title mb-0">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </h2>
              <p className="dashboard-subtitle mb-0">
                Bienvenido, {user?.fullName || 'Usuario'}
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                <i className="fas fa-user-circle me-1"></i>
                {user?.username || 'usuario'}
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="dashboard-content">
        <div className="container">
          {/* Welcome Card */}
          <div className="dashboard-card">
            <div className="row">
              <div className="col-md-8">
                <h3 className="dashboard-title">
                  <i className="fas fa-home me-2"></i>
                  ¡Bienvenido a tu Dashboard!
                </h3>
                <p className="dashboard-subtitle">
                  Has iniciado sesión exitosamente en el sistema Spring Boot PND.
                  Aquí puedes gestionar tu cuenta y acceder a todas las funcionalidades.
                </p>
              </div>
              <div className="col-md-4 text-end">
                <div className="p-3" style={{background: 'var(--primary-color)', borderRadius: '12px', color: 'white'}}>
                  <i className="fas fa-user-circle fa-3x mb-2"></i>
                  <h5 className="mb-0">{user?.fullName || 'Usuario'}</h5>
                  <small>{user?.email || 'usuario@email.com'}</small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="row">
            <div className="col-md-4">
              <div className="dashboard-card text-center">
                <i className="fas fa-user fa-2x mb-3" style={{color: 'var(--primary-color)'}}></i>
                <h4 className="dashboard-title">Perfil</h4>
                <p className="dashboard-subtitle">Gestiona tu información personal</p>
                <button className="btn btn-primary btn-sm">
                  <i className="fas fa-edit me-1"></i>
                  Editar Perfil
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard-card text-center">
                <i className="fas fa-cog fa-2x mb-3" style={{color: 'var(--primary-color)'}}></i>
                <h4 className="dashboard-title">Configuración</h4>
                <p className="dashboard-subtitle">Ajusta las preferencias del sistema</p>
                <button className="btn btn-primary btn-sm">
                  <i className="fas fa-sliders-h me-1"></i>
                  Configurar
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard-card text-center">
                <i className="fas fa-chart-bar fa-2x mb-3" style={{color: 'var(--primary-color)'}}></i>
                <h4 className="dashboard-title">Estadísticas</h4>
                <p className="dashboard-subtitle">Ve tus métricas y progreso</p>
                <button className="btn btn-primary btn-sm">
                  <i className="fas fa-chart-line me-1"></i>
                  Ver Stats
                </button>
              </div>
            </div>
          </div>
          
          {/* API Endpoints Card */}
          <div className="dashboard-card">
            <h3 className="dashboard-title">
              <i className="fas fa-code me-2"></i>
              Endpoints de API Disponibles
            </h3>
            <p className="dashboard-subtitle">
              Prueba estos endpoints desde Postman o el navegador:
            </p>
            
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3">Endpoints Básicos</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <code>GET /api/hello</code>
                    <a href="/api/hello" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </li>
                  <li className="mb-2">
                    <code>GET /api/matematicas/suma/5/3</code>
                    <a href="/api/matematicas/suma/5/3" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </li>
                  <li className="mb-2">
                    <code>GET /api/varios/estudiantes</code>
                    <a href="/api/varios/estudiantes" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5 className="mb-3">Endpoints CRUD</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <code>GET /api/playground/crud</code>
                    <a href="/api/playground/crud" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </li>
                  <li className="mb-2">
                    <code>GET /api/playground/advanced</code>
                    <a href="/api/playground/advanced" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </li>
                  <li className="mb-2">
                    <small className="text-muted">POST, PUT, DELETE disponibles en Postman</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* User Info Card */}
          <div className="dashboard-card">
            <h3 className="dashboard-title">
              <i className="fas fa-info-circle me-2"></i>
              Información de la Cuenta
            </h3>
            <div className="row">
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>ID:</strong></td>
                      <td>{user?.id || '1'}</td>
                    </tr>
                    <tr>
                      <td><strong>Usuario:</strong></td>
                      <td>{user?.username || 'admin'}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{user?.email || 'admin@example.com'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>Nombre:</strong></td>
                      <td>{user?.fullName || 'Administrador'}</td>
                    </tr>
                    <tr>
                      <td><strong>Registrado:</strong></td>
                      <td>{formatDate(user?.createdAt)}</td>
                    </tr>
                    <tr>
                      <td><strong>Estado:</strong></td>
                      <td>
                        <span className={`badge ${user?.enabled ? 'bg-success' : 'bg-danger'}`}>
                          {user?.enabled ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
