const { prismaClient } = require('@prisma/client');
const prisma = new prismaClient();



const create = async (req, res) => {
    try {
        const { namaModul, deskripsi } = req.body;

        const modul = await prisma.modul.create({
            data: {
                namaModul,
                date: new Date(),
                deskripsi
            }
        });

        res.status(201).json({ modul, message: 'Modul berhasil dibuat' });

    } catch (error) {
        console.error('Error membuat Modul:', error);
        res.status(500).json({ message: 'Gagal membuat Modul, ada kesalahan pada codinganmu', details: error.message });
    }
};


