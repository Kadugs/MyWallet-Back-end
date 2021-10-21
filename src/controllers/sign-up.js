import connection from '../database/database.js';
import {validateSignUp} from '../validation/sign-up.js';

async function createAccount(req, res) {
    const signUpInfos = req.body;
    const { name, email, password, confirmPassword } = signUpInfos;
    if(password !== confirmPassword) {
        res.status(401).send("Senha e confirmação da senha diferentes! Insira Valores iguais");
        return;
    }
    
    const errors = validateSignUp.validate(signUpInfos)
    if(errors) {
        res.send(errors).status(400);
        return;
    }
    try {

        const emailList = await connection.query(`SELECT email FROM users`);
        if(emailList.rows.some(dataEmail => dataEmail.email == email)) {
            res.status(401).send("Email já cadastrado!");
            return;
        }
        
        await connection.query(`
        INSERT 
        INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, 
        [name, email, password]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export {
    createAccount,
}