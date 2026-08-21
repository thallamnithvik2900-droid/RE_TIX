const mongoose = require('mongoose');

const transferRequestSchema = new mongoose.Schema(
    {
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
            required: true
        },
        oldOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        newOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const TransferRequest = mongoose.model('TransferRequest', transferRequestSchema);
module.exports = TransferRequest;
