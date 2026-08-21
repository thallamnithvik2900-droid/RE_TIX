const Ticket = require('../models/ticket.model');
const TransferRequest = require('../models/transferRequest.model');

const listPendingRequests = async () => {
    return await TransferRequest.find({ status: 'pending' })
        .populate('ticketId', 'title category price currentOwner')
        .populate('oldOwner', 'name email')
        .populate('newOwner', 'name email');
};

const requestTransfer = async ({ ticketId, newOwnerId }) => {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        const error = new Error('Ticket not found');
        error.status = 404;
        throw error;
    }

    if (!ticket.isVerified || ticket.status !== 'available') {
        const error = new Error('Ticket is not available for transfer');
        error.status = 400;
        throw error;
    }

    const existingRequest = await TransferRequest.findOne({ ticketId, status: 'pending' });
    if (existingRequest) {
        const error = new Error('A transfer request already exists for this ticket');
        error.status = 409;
        throw error;
    }

    const transferRequest = await TransferRequest.create({
        ticketId,
        oldOwner: ticket.currentOwner,
        newOwner: newOwnerId,
        status: 'pending'
    });

    ticket.status = 'pending';
    await ticket.save();

    return transferRequest;
};

const approveTransfer = async ({ requestId, approverRole }) => {
    const transferRequest = await TransferRequest.findById(requestId);
    if (!transferRequest) {
        const error = new Error('Transfer request not found');
        error.status = 404;
        throw error;
    }

    if (transferRequest.status !== 'pending') {
        const error = new Error('Transfer request is not pending');
        error.status = 400;
        throw error;
    }

    if (!['verifier', 'admin'].includes(approverRole)) {
        const error = new Error('You do not have permission to approve transfers');
        error.status = 403;
        throw error;
    }

    const ticket = await Ticket.findById(transferRequest.ticketId);
    if (!ticket) {
        const error = new Error('Associated ticket not found');
        error.status = 404;
        throw error;
    }

    transferRequest.status = 'approved';
    await transferRequest.save();

    ticket.currentOwner = transferRequest.newOwner;
    ticket.status = 'sold';
    await ticket.save();

    return { transferRequest, ticket };
};

module.exports = {
    listPendingRequests,
    requestTransfer,
    approveTransfer
};
