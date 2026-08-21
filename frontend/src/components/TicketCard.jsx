const categoryMeta = {
    bus: { icon: '🚌', label: 'Bus Ticket', highlight: 'rgba(239, 68, 68, 0.14)', text: '#ef4444' },
    movie: { icon: '🎬', label: 'Movie Ticket', highlight: 'rgba(59, 130, 246, 0.14)', text: '#3b82f6' },
    event: { icon: '🎟️', label: 'Event Ticket', highlight: 'rgba(16, 185, 129, 0.14)', text: '#10b981' }
};

const TicketCard = ({ ticket, onAction, actionLabel }) => {
    const category = categoryMeta[ticket.category] || {
        icon: '🎫',
        label: ticket.category,
        highlight: 'rgba(255, 255, 255, 0.1)',
        text: 'var(--text)'
    };

    return (
        <article className="ticket-card">
            <div className="ticket-top">
                <span
                    className="ticket-category"
                    style={{ background: category.highlight, color: category.text }}
                >
                    {category.icon} {category.label}
                </span>
                <span className="ticket-status">{ticket.status}</span>
            </div>
            <h3>{ticket.title}</h3>
            <p className="ticket-owner">Owner: {ticket.currentOwner?.name || 'Unknown'}</p>
            <div className="ticket-details">
                <span>Price: ${ticket.price.toFixed(2)}</span>
                <span>Verified: {ticket.isVerified ? 'Yes' : 'No'}</span>
            </div>
            {actionLabel && (
                <button className="primary-button" onClick={() => onAction(ticket)}>
                    {actionLabel}
                </button>
            )}
        </article>
    );
};

export default TicketCard;
