import { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import { fetchTickets, verifyTicket } from '../services/ticketService';

const VerifyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTickets({ all: true });
                const pendingTickets = data.filter(ticket => ticket.status === 'pending' && !ticket.isVerified);
                setTickets(pendingTickets);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load pending tickets');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleVerify = async (ticket) => {
        setError(null);
        setMessage(null);
        try {
            await verifyTicket(ticket._id);
            setMessage(`Ticket "${ticket.title}" has been verified and listed.`);
            setTickets((current) => current.filter((t) => t._id !== ticket._id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to verify ticket');
        }
    };

    return (
        <section className="browse-page">
            <div className="page-header">
                <span className="eyebrow">Verifier workspace</span>
                <h1>Pending ticket verifications</h1>
                <p>Review and verify new tickets before they are listed in the marketplace.</p>
            </div>
            {message && <div className="notification success">{message}</div>}
            {error && <div className="notification error">{error}</div>}
            {loading ? (
                <div className="loading-state">Loading pending tickets...</div>
            ) : tickets.length === 0 ? (
                <div className="empty-state">No pending tickets to verify at this time.</div>
            ) : (
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket._id}
                            ticket={ticket}
                            onAction={handleVerify}
                            actionLabel="Verify Ticket"
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default VerifyTickets;