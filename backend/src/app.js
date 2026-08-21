const express = require('express');
const cors = require('cors');
require('express-async-errors');
const authRoutes = require('./routes/auth.routes');
const ticketRoutes = require('./routes/ticket.routes');
const transferRoutes = require('./routes/transfer.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/transfer', transferRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
