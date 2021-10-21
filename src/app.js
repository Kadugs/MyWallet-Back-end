import express from 'express';

const app = express(); //Para criar um servidor;


app.get('/', (req, res) => {
    res.send("oi");
})


app.listen(4000) //Configura a porta;