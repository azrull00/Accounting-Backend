// authController.js
const bcrypt = require('bcryptjs'); // Gunakan bcryptjs bukan bcrypt
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { email, password, name, roleId } = req.body;

        // Cek user wes ono ta durung
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Buat user baru
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                roleId
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error registrasi:', error);
        res.status(500).json({ error: 'Gagal membuat akun', details: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email jrulll
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        // Buat cek password nya cuy
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Password salah' });
        }

        // Generate token jrulll
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error login:', error);
        res.status(500).json({ error: 'Gagal login', details: error.message });
    }
};

module.exports = { register, login };