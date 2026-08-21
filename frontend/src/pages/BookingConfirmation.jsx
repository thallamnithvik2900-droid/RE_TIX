import { useLocation, useNavigate } from 'react-router-dom';

const categoryIcons = {
    bus: '🚌',
    movie: '🎬',
    event: '🎟️'
};

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ticket = location.state?.ticket;

    if (!ticket) {
        return (
            <section className="confirmation-page">
                <div className="page-header">
                    <h1>Booking confirmation</h1>
                    <p>No ticket details were found for this booking.</p>
                </div>
                <button className="primary-button" onClick={() => navigate('/browse')}>
                    Back to marketplace
                </button>
            </section>
        );
    }

    return (
        <section className="confirmation-page">
            <div className="page-header">
                <span className="eyebrow">Booking confirmed</span>
                <h1>Your ticket purchase is underway</h1>
                <p>We’ve created the transfer request and will complete the booking after approval.</p>
            </div>
            <article className="ticket-card confirmation-card">
                <div className="ticket-top">
                    <span className="ticket-category">
                        {categoryIcons[ticket.category] || '🎫'} {ticket.category.toUpperCase()}
                    </span>
                    <span className="ticket-status">{ticket.status}</span>
                </div>
                <h3>{ticket.title}</h3>
                <p className="ticket-owner">Owner: {ticket.currentOwner?.name || 'Unknown'}</p>
                <div className="ticket-details">
                    <span>Price: ${ticket.price.toFixed(2)}</span>
                    <span>Verified: {ticket.isVerified ? 'Yes' : 'No'}</span>
                </div>
                <div className="confirmation-message">
                    <p>
                        The transfer request has been submitted. You can track the request in your dashboard once it is approved.
                    </p>
                </div>
            </article>
            <button className="primary-button" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
            </button>
        </section>
    );
};

export default BookingConfirmation;
