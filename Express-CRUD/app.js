const express = require('express');
const app = express();
app.use(express.json());

// Data
let items = [];

// POST Endpoint: This will allow us to add items to a local variable.
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).send('Item added');
});

// GET Endpoint: This will allow us to retrieve all items.
app.get('/items', (req, res) => {
    res.json(items);
});

// GET Endpoint by ID: This will allow us to retrieve a specific item base on id.
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// PUT Endpoint: This will allow us to update an existing item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        Object.assign(item, req.body);
        res.send('Item updated');
    } else {
        res.status(404).send('Item not found');
    }
});

// DELETE Endpoint: This will allow us to delete an item.
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        items.splice(index, 1);
        res.send('Item deleted');
    } else {
        res.status(404).send('Item not found');
    }
});



// Starting the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
