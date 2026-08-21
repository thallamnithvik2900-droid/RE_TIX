const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Re-Tix backend running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    });
