const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Ticket title is required'],
            trim: true
        },
        category: {
            type: String,
            enum: ['bus', 'movie', 'event'],
            required: [true, 'Ticket category is required']
        },
        price: {
            type: Number,
            required: [true, 'Ticket price is required'],
            min: [0, 'Price must be non-negative']
        },
        originalOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        currentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'available', 'sold'],
            default: 'pending'
        },
        eventDate: {
            type: String,
            trim: true
        },
        eventTime: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        seatInfo: {
            type: String,
            trim: true
        },
        imageData: {
            type: String,
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

ticketSchema.index({ title: 1, originalOwner: 1 }, { unique: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
