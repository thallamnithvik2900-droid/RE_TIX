import api from './api';

export const fetchTickets = async (params = {}) => {
    const response = await api.get('/tickets', { params });
    return response.data;
};

export const fetchTicketById = async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
};

export const sellTicket = async (payload) => {
    const response = await api.post('/tickets', payload);
    return response.data;
};

export const buyTicket = async (ticketId) => {
    const response = await api.post('/tickets/buy', { ticketId });
    return response.data;
};

export const verifyTicket = async (ticketId) => {
    const response = await api.patch(`/tickets/${ticketId}/verify`);
    return response.data;
};
