const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
    { id: '2', author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

const messageStatus = [
    {message: 'OK'},
    {message: 'Not found...'}
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
    for(let findId of db) {
        if(req.params.id === findId.id) {
            res.json(findId)
        };
    };
});

app.post('/testimonials', (req, res) => {

    const {author, text} = req.body;
    const id = uuidv4();
    db.push({id: id, author: author, text: text }),
    res.json(messageStatus[0]);
});

app.put('/testimonials/:id', (req, res) => {

    const {author, text} = req.body;
    for(let findId of db) {
        if(req.params.id === findId.id) {
            db[db.indexOf(findId)] = {id: findId.id, author: author, text: text};
            res.json(messageStatus[0]);
        };
    };
});

app.delete('/testimonials/:id', (req, res) => {

    const {author, text} = req.body;
    for(let findId of db) {
        if(req.params.id === findId.id) {
            db.splice(db.indexOf(findId), 1);
            res.json(messageStatus[0]);
        };
    };
});

app.use((req, res) => {
    res.status(404).json(messageStatus[1]);
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});