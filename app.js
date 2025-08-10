const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require("./routes/auth");
const transactionRoutes = require('./routes/transaction');
const categoryRoutes = require("./routes/category");
const rateLimit = require("express-rate-limit");


dotenv.config();
const prisma = new PrismaClient();
const app = express();


// Rate Limiterr
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    handler: (req, res) => {
        res.status(429).json({
            status: false,
            message: "Too many requests from this IP, please try again later."
        });
        return apiResponse(res, 429, "Too many requests from this IP, please try again later.");
    }
});

app.use(limiter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Learning Node js"
    });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/category', categoryRoutes);
// app.use('/api/model', ModelRoutes);

// Error handling middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT} euy`);
});