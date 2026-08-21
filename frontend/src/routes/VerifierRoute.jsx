import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifierRoute = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== 'verifier' && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

export default VerifierRoute;