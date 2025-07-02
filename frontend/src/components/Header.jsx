import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">GastosApp</Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <Link className="btn btn-primary" to="/register">Registrarse</Link>
      </div>
    </nav>
  );
};

export default Header;
