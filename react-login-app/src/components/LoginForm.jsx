import { useState } from "react";
import { loginRequest } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest(username, password);
      login(data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("❌ Credenciales inválidas o error de conexión");
    }
  };

  // 🎨 Estilos en línea
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(-45deg, #6a11cb, #2575fc, #00c6ff, #0072ff)",
      backgroundSize: "400% 400%",
      animation: "gradientMove 12s ease infinite",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      padding: "40px",
      borderRadius: "16px",
      width: "320px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      color: "#fff",
      transition: "transform 0.3s ease",
    },
    title: {
      fontSize: "1.8rem",
      marginBottom: "1.5rem",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "1rem",
      border: "none",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      transition: "0.3s ease",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      background: "linear-gradient(45deg, #00c6ff, #0072ff)",
      color: "#fff",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 5px 15px rgba(0, 198, 255, 0.5)",
    },
    error: {
      color: "#ff4b5c",
      fontSize: "0.9rem",
      marginBottom: "1rem",
    },
  };

  // 🌀 Simulación de animación (solo una vez al cargar)
  const gradientKeyframes = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  const styleSheet = document.styleSheets[0];
  if (styleSheet && !styleSheet.rules.namedItem?.("gradientMove")) {
    styleSheet.insertRule(gradientKeyframes, styleSheet.cssRules.length);
  }

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
