const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("./routes/auth");
// const postRoutes = require("./routes/post");
// const commentRoutes = require("./routes/comment");
// const categoryRoutes = require("./routes/category");
// const roleRoutes = require("./routes/role");
// const profileRoutes = require("./routes/profile");
const prisma = new PrismaClient();


const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});