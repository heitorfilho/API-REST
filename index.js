// configuracao inicial
require('dotenv').config(); // importar dotenv
const express = require('express');
const mongoose = require('mongoose');
const app = express();


// forma de ler JSON
// utiliza middlewares - funcoes que interceptam requisicoes
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json()); // consegue ler JSON

// rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes); // usar as rotas de personRoutes (middleware

// rota inicial / endpoint
app.get('/', (req, res) => {

    // mostrar req
    res.json({message: 'Express'}); // resposta da rota '/' vai ser um JSON
    
});

// entregar uma porta

// usuario e senha no arquivo .env
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vfxbuwp.mongodb.net/?retryWrites=true&w=majority`)

    .then(() => {
        console.log('Conectado ao banco de dados');
        app.listen(5000); // colocar porta 3000
    })

    .catch((err) => console.log(err))


app.listen(3000); // porta padrao do node