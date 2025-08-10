const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const create = async (req, res) => {

    try {
        const {
            name, posts
        } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
                posts
            }
        });

        res.status(201).json({ category, message: 'Data Category berhasil dibuat' });

    } catch (error) {
        console.error('Error membuat Data')
        res.status(500).json({ message: 'Gagal membuat Data baru ,  Codinganmu ada yg salah' })
    }
};

const findAll = async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.status(200).json(category, { message: 'Data Category Ditemukan' })
    } catch (error) {
        console.error('Gagal menemukan Data Kategori')
        res.status(500).json({ message: 'Gagal menganmbil data kategori , codinganmu ada yang salah' })
    }
};

const findById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({ where: { id } });
        res.status(201).json(category, { message: 'Data Category berdasarkan id ditemukan' })
    } catch (error) {
        console.error('Data berdasarkan id tidak ditemukan');
        res.status(500).json({ message: 'Data berdasarkan Id kategori tidak ada , codinganmu salah' })
    }
};

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, posts } = req.body;

        const updated = await prisma.category.update({
            where: { id },
            data: {
                name,
                posts
            }
        });

        res.status(201).json(updated, { message: 'Data kategori berhasil diupdate' });
    } catch (error) {
        console.error('Data kategori gagal diupdate');
        res.status(500).json({ message: 'Data gagal diupdate , codinganmmu ada yg salah' });
    }
};

const deleted = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.category.delete({ where: { id } });

        res.status(201).json({ message: 'Data berhasil dihapus euy' })
    } catch (error) {
        console.error('Data Kategori gagal dihapus');
        res.status(500).json({ message: 'Data gagal dihapus euy , codinganmu ada yg salah' })
    }
};



module.exports = {
    create, deleted, findAll, findById, update
};