require("dotenv").config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())

const poll = mysql.createPool(
    {
        uri: 'mysql://root:OIOxasMVoNwKaZpbTTrHJgkmJMgcINMd@autorack.proxy.rlwy.net:30301/railway', 
        connectionLimit: 5,
}
);

async function getQuestions(level) {   
    try {
        const [rows] = await poll.query('SELECT * FROM questions WHERE level = ?', [level]);
        return rows;
    } catch(error) {
        throw error;
    } 
}

app.get('/:level', async (req, res) => {
    const level = req.params.level;

    if(!['easy', 'medium', 'hard', 'legendary'].includes(level)) {
        return res.status(400).send({error: 'Invalid level'})
    }

    try {
        const questions = await getQuestions(level);
        return res.json({level, questions});
    } catch(error) {
        console.error(error)
        return res.status(500).send({error: 'Database error', details: error.message})
    }
});

app.listen(port, () => {
    console.log(`Server is running`);
});