import connection from '../database/database.js';

async function listUserTransactions(req, res) {
    try {
        const teste = await  connection.query('SELECT * FROM users');
        res.send(teste);
    } catch (err) {
        console.error(err);
    }
}

async function postTransaction(req, res) {
    try {

    } catch (err) {
        res.sendError(err);
    }
}

export {
    listUserTransactions,
    postTransaction,
}