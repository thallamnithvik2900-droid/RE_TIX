import { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import { fetchTickets } from '../services/ticketService';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTickets({ mine: true });
                setTickets(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load your tickets');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section className="browse-page">
            <div className="page-header">
                <span className="eyebrow">Your inventory</span>
                <h1>My tickets</h1>
                <p>Review your current tickets, track verification status, and monitor ownership.</p>
            </div>
            {error && <div className="notification error">{error}</div>}
            {loading ? (
                <div className="loading-state">Loading your tickets...</div>
            ) : tickets.length === 0 ? (
                <div className="empty-state">No tickets found. Create one to start selling.</div>
            ) : (
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyTickets;
