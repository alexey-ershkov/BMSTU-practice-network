const express = require('express');
const {createHash} = require('node:crypto');

function generateToken(content) {
    return createHash('sha256').update(content).digest('hex')
}

const app = express();
const PORT = process.env.PORT || 3001;

const tokens = [];

app.use(express.json())

app.get('/token', (req, res) => {
    const token = generateToken(new Date().toDateString());
    tokens.push(token);
    res.send({token})
});

app.get('/token/:token', (req, res) => {
    if (!tokens.includes(req.params.token)) {
        res.status(404).send({message: 'Token not found'});
        return;
    }

    res.send({message: 'ok'})
})


app.listen(PORT, () => {
    console.log(`Auth service is listening on ${PORT}`);
});