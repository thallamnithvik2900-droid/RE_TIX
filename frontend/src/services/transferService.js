import api from './api';

export const fetchPendingRequests = async () => {
    const response = await api.get('/transfer/requests');
    return response.data;
};

export const approveRequest = async (requestId) => {
    const response = await api.patch('/transfer/approve', { requestId });
    return response.data;
};
