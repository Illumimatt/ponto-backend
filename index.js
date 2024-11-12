const express = require('express');
const app = express();
const PORT = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');


sequelize.sync({ alter: true })
.then(() => {
    console.log("BD sincronizado");
})
.catch(error => {
    console.log("Erro!");
});


app.get('/usuario/:id_usuario', async (req, res) => {
    const usuario= await Usuario.findAll({
        where: {
            id_usuario: req.params.id_usuario,
        },
    });
    res.json(usuario);
});

app.post('/usuario', async (req, res) => {
   
    console.log(req.body);
    const usuario = await Usuario.create({
        nome: req.body.nome, 
        email: req.body.email, 
        senha: req.body.senha, 
        login: req.body.login, 
        permissao: req.body.permissao,
    })
    res.status(201).json(usuario);
    // nome, email, senha, login, permissao("usuario""administrador")
})

// ROTAS
app.get('/', (req, res) => {
    res.send("Chamada ao recurso realizada com sucesso");
});

// retornar todos os usuários
app.get('/users', (req, res) => {
    res.send("Aqui vou retornar todos os usuários do sistema")
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id)
});

app.post('/rotapost', (req, res) => {
    res.send("Chamada ao recurso usando o post realizada com sucesso");
});


app.listen(PORT, () => {
    console.log("Servidor aguardando requisições");
});