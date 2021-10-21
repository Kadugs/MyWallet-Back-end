import connection from '../database/database.js';
import {validateSignUp} from '../validation/sign-up.js';
import bcrypt from 'bcrypt';

async function createAccount(req, res) {
    const signUpInfos = req.body;
    const { name, email, password, confirmPassword } = signUpInfos;
    if(password !== confirmPassword) {
        res.status(401).send("Senha e confirmação da senha diferentes! Insira Valores iguais");
        return;
    }
    
    const validate = validateSignUp.validate({
        name, 
        email, 
        password, 
        confirmPassword
    })
    if(validate.error) {
        res.status(400).send("Dados inseridos inválidos, tente novamente!");
        return;
    }
    try {
        const emailList = await connection.query(`SELECT email FROM users`);
        if(emailList.rows.some(dataEmail => dataEmail.email == email)) {
            res.status(401).send("Email já cadastrado!");
            return;
        }
        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query(`
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3)`, 
            [name, email, passwordHash]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send("Erro no servidor!");
    }

}

export {
    createAccount,
}