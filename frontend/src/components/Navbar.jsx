import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="navbar">
            <div className="nav-brand">
                <Link to="/">Re-Tix</Link>
            </div>
            <nav className="nav-links">
                <NavLink to="/" end>
                    Home
                </NavLink>
                {user ? (
                    <>
                        <NavLink to="/browse">Browse</NavLink>
                        <NavLink to="/sell">Sell</NavLink>
                        <NavLink to="/my-tickets">My Tickets</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        {(user.role === 'verifier' || user.role === 'admin') && (
                            <NavLink to="/requests">Requests</NavLink>
                        )}
                        <button type="button" className="nav-button" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
