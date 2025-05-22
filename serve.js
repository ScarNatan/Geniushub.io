const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Para o front-end acessar o back-end
const cors = require('cors');
app.use(cors());

// Para lidar com as requisições JSON
app.use(bodyParser.json());

// Simular um banco de dados para armazenar as respostas
let respostas = {
    "Desafio 1: Página de Login": [],
    "Desafio 2: API de Tarefas em Node.js": [],
    "Desafio 3: Tela de Cadastro de Currículo": [],
    "Desafio 4: Proposta de Solução Digital": []
};

// Endpoint para enviar uma resposta de um aluno
app.post('/enviarResposta', (req, res) => {
    const { desafio, resposta, aluno, timestamp } = req.body;
    
    if (desafio && resposta && aluno) {
        respostas[desafio].push({ resposta, aluno, timestamp });
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Dados inválidos' });
    }
});

// Endpoint para pegar as respostas de um desafio específico
app.get('/respostas/:desafio', (req, res) => {
    const desafio = req.params.desafio;
    if (respostas[desafio]) {
        res.json(respostas[desafio]);
    } else {
        res.status(404).json({ message: 'Desafio não encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
