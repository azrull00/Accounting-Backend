// authController.js
const bcrypt = require('bcryptjs'); // Gunakan bcryptjs bukan bcrypt
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const register = async (req, res) => {
//     try {
//         const { name, password, email } = req.body;

//         // Cek user wes ono ta durung
//         const existingUser = await prisma.user.findUnique({
//             where: { email }
//         });

//         if (existingUser) {
//             return res.status(400).json({ error: 'Email sudah terdaftar' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // / Jika roleId tidak diberikan, cari role bernama 'user'
//         let roleToConnectId;
//         if (roleId) {
//             const r = parseInt(roleId, 10);
//             if (Number.isNaN(r)) return res.status(400).json({ error: 'roleId harus angka' });
//             roleToConnectId = r;
//         } else {
//             const defaultRole = await prisma.role.findUnique({
//                 where: { name: 'User' } // pastikan ada unique constraint on role.name
//             });
//             if (!defaultRole) {
//                 return res.status(500).json({ error: 'Default role "user" tidak ditemukan di database' });
//             }
//             roleToConnectId = defaultRole.id;
//         }

//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword,
//                 name,
//                 role: { connect: { id: roleToConnectId } }
//             },
//             select: { id: true, email: true, name: true }
//         });

//         res.status(201).json(user);

//     } catch (error) {
//         console.error('Error registrasi:', error);
//         res.status(500).json({ error: 'Gagal membuat akun', details: error.message });
//     }
// };

const register = async (req, res) => {
    try {
        const { email, password, name, roleId } = req.body; // pastikan roleId diambil di sini

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'email, password dan name wajib dikirim' });
        }

        // cek user exist
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'Email sudah terdaftar' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // tentukan role yang akan di-connect
        let roleToConnectId;
        if (roleId !== undefined && roleId !== null) {
            // jika client mengirim roleId, konversi & validasi
            const r = parseInt(roleId, 10);
            if (Number.isNaN(r)) return res.status(400).json({ error: 'roleId harus angka' });
            // opsional: cek apakah role ada
            const roleExists = await prisma.role.findUnique({ where: { id: r } });
            if (!roleExists) return res.status(400).json({ error: 'roleId tidak ditemukan' });
            roleToConnectId = r;
        } else {
        
            const defaultRole = await prisma.role.findUnique({ where: { name: 'user' } })
                .catch(() => null);
            if (!defaultRole) {
                // jika tidak ada role 'user', kamu bisa fallback ke mencari role pertama atau kembalikan error
                return res.status(500).json({ error: 'Default role "user" tidak ditemukan di database' });
            }
            roleToConnectId = defaultRole.id;
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: { connect: { id: roleToConnectId } } // hubungkan ke role yang sudah ada
            },
            select: { id: true, email: true, name: true }
        });

        return res.status(201).json(user);

    } catch (error) {
        console.error('Error registrasi:', error);
        return res.status(500).json({ error: 'Gagal membuat akun', details: error.message });
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