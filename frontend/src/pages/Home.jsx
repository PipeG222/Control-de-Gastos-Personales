import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Bienvenido a tu Control de Gastos Personales</h1>
      <p className="lead">
        Administra tus ingresos y gastos fácilmente. Visualiza tus movimientos financieros,
        mantén tus hábitos bajo control y toma decisiones más inteligentes con tu dinero.
      </p>
      <div className="mt-4">
        <Link className="btn btn-success me-2" to="/login">Iniciar Sesión</Link>
        <Link className="btn btn-outline-primary" to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

export default Home;
