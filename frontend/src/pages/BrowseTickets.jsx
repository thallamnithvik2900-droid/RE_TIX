import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import Notification from '../components/Notification';
import { fetchTickets, buyTicket } from '../services/ticketService';

const BrowseTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load tickets');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleBuy = async (ticket) => {
        setError(null);
        setMessage(null);
        try {
            const result = await buyTicket(ticket._id);
            navigate('/booking-confirmation', { state: { ticket, message: result.message } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to purchase ticket');
        }
    };

    return (
        <section className="browse-page">
            <div className="page-header">
                <span className="eyebrow">Marketplace</span>
                <h1>Browse resale tickets</h1>
                <p>Only verified listings are shown to protect buyers and prevent fraud.</p>
            </div>
            <Notification message={message} type="success" />
            <Notification message={error} type="error" />
            {loading ? (
                <div className="loading-state">Loading tickets...</div>
            ) : tickets.length === 0 ? (
                <div className="empty-state">No resale tickets are available right now.</div>
            ) : (
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} onAction={handleBuy} actionLabel="Buy Now" />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BrowseTickets;
