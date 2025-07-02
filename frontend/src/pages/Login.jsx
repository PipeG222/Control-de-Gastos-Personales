import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // 👈 necesario para redireccionar

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
        navigate("/dashboard"); // 👈 redirige al dashboard
      } else {
        alert(data.error || 'Credenciales inválidas');
      }
    } catch {
      alert('Error de red');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
