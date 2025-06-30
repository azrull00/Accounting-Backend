const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const create = async (req, res) => {
    try {
        const { date, description, userId, accountId, debitAmount, creditAmount, journalId } = req.body;

        const transaction = await prisma.transaction.create({

            data: {
                date: new Date(date),
                description,
                userId,
                accountId,
                debitAmount,
                creditAmount,
                journalId
            }
        });

        res.status(201).json(transaction);

    } catch (error) {
        console.error('Error membuat Transaksi ', error)
        res.status(500).json({ error: 'Codinganmu / Data request mu salah lek', details: error.message });
    }
};

const findAll = async (req, res) => {

    try {
        const transaction = await prisma.transaction.findMany();
        res.json(transaction);

    } catch (error) {
        console.error('Error menemukan transaksi', error);
        res.status(500).json({ error: ' Codinganmu Salah lek' });
    }
};

const findById = async (req, res) => {
    try {
        const transaction = await prisma.transaction.findById();
        res.json(transaction);
    } catch (error) {
        console.error(' Id yang dicari gak ada euy');
        res.status(500).json({ error: 'Codinganmu salah , gaada id yang bisa ditemukan lek' });
    }
}


const update = async (req, res) => {

    try {

        const id = parseInt(req.params.id);
        const { date, description, userId, accountId, debitAmount, creditAmount, journalId } = req.body;

        const updated = await prisma.transaction.update({
            where: { id },
            data: {
                date: new Date(date),
                description,
                userId,
                accountId,
                debitAmount,
                creditAmount,
                journalId
            }
        });

        res.status(201).json(updated, { message: 'Data berhasil diupdate euy' });

    } catch (error) {
        console.error('Codingan error data gabisa diupdate')
        res.status(500).json({ error: 'gagal update data euy ,  ada yang salah codinganmu' });
    }
};

const deleted = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.transaction.delete({ where: { id } });
        res.status(201).json({ message: 'Data Transaksi berhasil dihapus euy' })
    } catch (error) {
        console.error('Error menghapus data Transaksi euy')
        res.status(500).json({ error: 'Gagal menghapus data transaksi , codinganmu ada yg salah' })
    }
}

module.exports = {
    create, deleted, findAll, findById, update,
}

