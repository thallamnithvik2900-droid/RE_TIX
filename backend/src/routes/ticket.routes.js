const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const protect = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/', protect, ticketController.getTickets);
router.get('/:id', protect, ticketController.getTicketById);
router.post('/', protect, ticketController.createTicket);
router.post('/buy', protect, ticketController.buyTicket);
router.patch('/:id/verify', protect, authorizeRoles('verifier', 'admin'), ticketController.verifyTicket);

module.exports = router;
