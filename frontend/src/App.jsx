import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseTickets from './pages/BrowseTickets';
import SellTicket from './pages/SellTicket';
import MyTickets from './pages/MyTickets';
import TransferRequests from './pages/TransferRequests';
import VerifyTickets from './pages/VerifyTickets';
import BookingConfirmation from './pages/BookingConfirmation';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import VerifierRoute from './routes/VerifierRoute';

function App() {
    const { user } = useAuth();

    return (
        <div className="app-shell">
            <Navbar />
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/browse" element={<BrowseTickets />} />
                        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                        <Route path="/sell" element={<SellTicket />} />
                        <Route path="/my-tickets" element={<MyTickets />} />
                        <Route element={<VerifierRoute />}>
                            <Route path="/requests" element={<TransferRequests />} />
                            <Route path="/verify-tickets" element={<VerifyTickets />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
