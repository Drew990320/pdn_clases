import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { token, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {/* <p>Tu token: {token}</p> */}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
