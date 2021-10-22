import connection from '../database/database.js';

async function signOut(req, res) {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    try {
        await connection.query(`DELETE FROM sessions WHERE token = $1`, [token]);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
}
export {
    signOut,
}