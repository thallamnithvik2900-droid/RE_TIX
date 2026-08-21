const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transfer.controller');
const protect = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/requests', protect, authorizeRoles('verifier', 'admin'), transferController.getPendingRequests);
router.post('/request', protect, transferController.requestTransfer);
router.patch('/approve', protect, authorizeRoles('verifier', 'admin'), transferController.approveTransfer);

module.exports = router;
