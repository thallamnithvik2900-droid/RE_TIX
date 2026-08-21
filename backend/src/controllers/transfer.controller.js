const transferService = require('../services/transfer.service');

const getPendingRequests = async (req, res) => {
    const transferRequests = await transferService.listPendingRequests();
    res.json(transferRequests);
};

const requestTransfer = async (req, res) => {
    const { ticketId, newOwnerId } = req.body;
    const transferRequest = await transferService.requestTransfer({ ticketId, newOwnerId });
    res.status(201).json({ message: 'Transfer request submitted', transferRequest });
};

const approveTransfer = async (req, res) => {
    const requestId = req.body.requestId;
    const result = await transferService.approveTransfer({
        requestId,
        approverRole: req.user.role
    });
    res.json({ message: 'Transfer approved', transfer: result.transferRequest, ticket: result.ticket });
};

module.exports = {
    getPendingRequests,
    requestTransfer,
    approveTransfer
};
