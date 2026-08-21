import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchTickets } from '../services/ticketService';
import { fetchPendingRequests } from '../services/transferService';

const Dashboard = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState({ available: 0, sold: 0, pending: 0 });
    const [pendingVerifications, setPendingVerifications] = useState(0);
    const [pendingTransfers, setPendingTransfers] = useState(0);

    useEffect(() => {
        const loadSummary = async () => {
            try {
                if (user.role === 'verifier' || user.role === 'admin') {
                    // For verifiers, show pending verifications and transfers
                    const allTickets = await fetchTickets({ all: true });
                    const pendingTickets = allTickets.filter(ticket => ticket.status === 'pending' && !ticket.isVerified);
                    setPendingVerifications(pendingTickets.length);

                    const transferRequests = await fetchPendingRequests();
                    setPendingTransfers(transferRequests.length);
                } else {
                    // For regular users, show their ticket summary
                    const tickets = await fetchTickets({ all: true });
                    const counts = tickets.reduce(
                        (acc, ticket) => {
                            acc[ticket.status] += 1;
                            return acc;
                        },
                        { available: 0, sold: 0, pending: 0 }
                    );
                    setSummary(counts);
                }
            } catch (err) {
                // Silently handle errors to avoid console spam
                // Error state could be added here if needed
            }
        };
        loadSummary();
    }, [user.role]);

    return (
        <section className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <span className="eyebrow">Welcome back, {user.name}</span>
                    <h1>Your dashboard</h1>
                    <p>Manage your tickets, view marketplace activity, and monitor transfer status in one place.</p>
                </div>
            </div>
            <div className="dashboard-grid">
                {user.role === 'verifier' || user.role === 'admin' ? (
                    <>
                        <article className="dashboard-card gradient-card">
                            <h3>Pending Verifications</h3>
                            <p>{pendingVerifications} tickets awaiting verification before listing.</p>
                            <Link to="/verify-tickets" className="secondary-button">
                                Review Tickets
                            </Link>
                        </article>
                        <article className="dashboard-card gradient-card">
                            <h3>Transfer Requests</h3>
                            <p>{pendingTransfers} pending transfer approvals to review.</p>
                            <Link to="/requests" className="secondary-button">
                                Review Now
                            </Link>
                        </article>
                        <article className="dashboard-card">
                            <h3>Verifier Tools</h3>
                            <p>Approve transfers and verify tickets to keep the marketplace secure.</p>
                        </article>
                    </>
                ) : (
                    <>
                        <article className="dashboard-card gradient-card">
                            <h3>Browse Resale Tickets</h3>
                            <p>Discover verified resale tickets available for purchase.</p>
                            <Link to="/browse" className="secondary-button">
                                Browse Now
                            </Link>
                        </article>
                        <article className="dashboard-card gradient-card">
                            <h3>Sell a Ticket</h3>
                            <p>Upload a new ticket and begin the verification workflow.</p>
                            <Link to="/sell" className="secondary-button">
                                Sell Ticket
                            </Link>
                        </article>
                        <article className="dashboard-card gradient-card">
                            <h3>My Tickets</h3>
                            <p>Track your current inventory and verification progress.</p>
                            <Link to="/my-tickets" className="secondary-button">
                                View Tickets
                            </Link>
                        </article>
                        <article className="dashboard-card">
                            <h3>Your Role</h3>
                            <p>{user.role}</p>
                            <p>{user.role === 'verifier' ? 'Approve transfer requests and prevent fraud.' : 'Buy or list tickets safely.'}</p>
                        </article>
                    </>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
