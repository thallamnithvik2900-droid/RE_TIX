const Ticket = require('../models/ticket.model');
const TransferRequest = require('../models/transferRequest.model');

const createTicket = async ({ title, category, price, eventDate, eventTime, location, seatInfo, imageData, ownerId }) => {
    const existingTicket = await Ticket.findOne({ title, originalOwner: ownerId });
    if (existingTicket) {
        const error = new Error('A ticket with this title already exists for your account');
        error.status = 409;
        throw error;
    }

    const ticket = await Ticket.create({
        title,
        category,
        price,
        eventDate,
        eventTime,
        location,
        seatInfo,
        imageData,
        originalOwner: ownerId,
        currentOwner: ownerId,
        status: 'pending',
        isVerified: false
    });
    return ticket;
};

const getAllTickets = async ({ onlyVerified = true, userId, ownOnly = false }) => {
    const filter = {};
    if (onlyVerified) {
        filter.isVerified = true;
        filter.status = 'available';
    }
    if (ownOnly) {
        filter.currentOwner = userId;
    }
    return await Ticket.find(filter).populate('originalOwner currentOwner', 'name email role');
};

const getTicketById = async (ticketId) => {
    const ticket = await Ticket.findById(ticketId).populate('originalOwner currentOwner', 'name email role');
    if (!ticket) {
        const error = new Error('Ticket not found');
        error.status = 404;
        throw error;
    }
    return ticket;
};

const verifyTicket = async ({ ticketId }) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        const error = new Error('Ticket not found');
        error.status = 404;
        throw error;
    }

    ticket.isVerified = true;
    ticket.status = 'available';
    await ticket.save();
    return ticket;
};

const buyTicket = async ({ ticketId, buyerId }) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        const error = new Error('Ticket not found');
        error.status = 404;
        throw error;
    }

    if (!ticket.isVerified || ticket.status !== 'available') {
        const error = new Error('Ticket is not available for purchase');
        error.status = 400;
        throw error;
    }

    if (ticket.currentOwner.toString() === buyerId) {
        const error = new Error('You already own this ticket');
        error.status = 400;
        throw error;
    }

    const existingRequest = await TransferRequest.findOne({ ticketId, status: 'pending' });
    if (existingRequest) {
        const error = new Error('A transfer request is already pending for this ticket');
        error.status = 409;
        throw error;
    }

    const transferRequest = await TransferRequest.create({
        ticketId,
        oldOwner: ticket.currentOwner,
        newOwner: buyerId,
        status: 'pending'
    });

    ticket.status = 'pending';
    await ticket.save();

    return transferRequest;
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    verifyTicket,
    buyTicket
};
