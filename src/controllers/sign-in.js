import connection from '../database/database.js';
import {validateSignIn} from "../validation/sign-in.js"
import bcrypt from 'bcrypt';

async function userLogin(req, res) {
    const {email, password} = req.body;
    try {
        const database = await connection.query(`SELECT password FROM users where email = $1`, [email]);
        if(database.rowCount === 0) {
            res.status(401).send("email não cadastrado, clique logo abaixo para criar uma conta!");
            return;
        }
        const validate = validateSignIn.validate({
            email, 
            password,
        })
        if(validate.error) {
            res.status(400).send("Dados inseridos inválidos, tente novamente!");
            return;
        }
        console.log(password, " ", database.rows[0].password)
        if(bcrypt.compareSync(password, database.rows[0].password)) {
            // agora tem que retornar um token
            res.sendStatus(200);
            return;
        }
    } catch (err) {
        res.status(500).send("Erro no servidor!");
    }

}
export {
    userLogin,
}