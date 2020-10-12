const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.use(express.static(__dirname));

app.get('/', async(req, res) => {
    try {
        res.send(await readFile('./index.html', 'utf8'));
    } catch (err) {
        res.status(500).send('Sorry, this page is currently down!');
    }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));