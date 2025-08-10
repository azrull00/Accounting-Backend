const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require("./routes/auth");
const transactionRoutes = require('./routes/transaction');
const categoryRoutes = require("./routes/category");
const ModelRoutes = require("./routes/model");

dotenv.config();
const prisma = new PrismaClient();
const app = express();

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