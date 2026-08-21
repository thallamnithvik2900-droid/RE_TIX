import { useEffect, useState } from 'react';
import { fetchPendingRequests, approveRequest } from '../services/transferService';

const TransferRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchPendingRequests();
                setRequests(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load transfer requests');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleApprove = async (requestId) => {
        setError(null);
        setMessage(null);
        try {
            const result = await approveRequest(requestId);
            setMessage(result.message);
            setRequests((current) => current.filter((item) => item._id !== requestId));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to approve transfer');
        }
    };

    return (
        <section className="browse-page">
            <div className="page-header">
                <span className="eyebrow">Verifier workspace</span>
                <h1>Pending transfer approvals</h1>
                <p>Approve transfer requests to complete ownership changes and prevent fraud.</p>
            </div>
            {message && <div className="notification success">{message}</div>}
            {error && <div className="notification error">{error}</div>}
            {loading ? (
                <div className="loading-state">Loading transfer requests...</div>
            ) : requests.length === 0 ? (
                <div className="empty-state">No pending requests at this time.</div>
            ) : (
                <div className="tickets-grid">
                    {requests.map((request) => (
                        <article key={request._id} className="ticket-card">
                            <div className="ticket-top">
                                <span className="ticket-category">{request.ticketId?.category || 'Ticket'}</span>
                                <span className="ticket-status">{request.status}</span>
                            </div>
                            <h3>{request.ticketId?.title || 'Unknown ticket'}</h3>
                            <p className="ticket-owner">From: {request.oldOwner?.name || 'N/A'}</p>
                            <p className="ticket-owner">To: {request.newOwner?.name || 'N/A'}</p>
                            <p>Requested: {new Date(request.createdAt).toLocaleString()}</p>
                            <button className="primary-button" onClick={() => handleApprove(request._id)}>
                                Approve Transfer
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TransferRequests;
