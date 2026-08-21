const ticketService = require('../services/ticket.service');

const createTicket = async (req, res) => {
    const { title, category, price, eventDate, eventTime, location, seatInfo, imageData } = req.body;
    const ticket = await ticketService.createTicket({
        title,
        category,
        price,
        eventDate,
        eventTime,
        location,
        seatInfo,
        imageData,
        ownerId: req.user._id
    });
    res.status(201).json(ticket);
};

const getTickets = async (req, res) => {
    const onlyVerified = req.query.all !== 'true';
    const ownOnly = req.query.mine === 'true';
    const tickets = await ticketService.getAllTickets({
        onlyVerified,
        userId: req.user ? req.user._id : null,
        ownOnly
    });
    res.json(tickets);
};

const getTicketById = async (req, res) => {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.json(ticket);
};

const verifyTicket = async (req, res) => {
    const ticket = await ticketService.verifyTicket({ ticketId: req.params.id });
    res.json({ message: 'Ticket verified and listed', ticket });
};

const buyTicket = async (req, res) => {
    const { ticketId } = req.body;
    const transferRequest = await ticketService.buyTicket({
        ticketId,
        buyerId: req.user._id
    });
    res.status(201).json({ message: 'Transfer request created', transferRequest });
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    verifyTicket,
    buyTicket
};
