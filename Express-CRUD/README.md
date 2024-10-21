# TP: Express.js CRUD Application

## 1. What is Express.js?

**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building server-side applications by providing tools to manage HTTP requests, routes, middlewares, and much more. You can use Express.js to create APIs, single-page applications, and even full-fledged web applications.

## 2. What are Middlewares?

**Middlewares** in Express.js are functions that have access to the request object (`req`), the response object (`res`), and the next function in the application’s request-response cycle. They can execute code, modify the request and response objects, end the request-response cycle, or call the next middleware function.

### Example 1: Logging Middleware

```js
const loggerMiddleware = (req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
};
```

### Example 2: Authentication Middleware

```js
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};
```

In both examples, `next()` is called to pass control to the next middleware or route handler.

## 3. Creating a Simple CRUD Application

### Step 1: Create a Project Directory

First, create a new directory for the project:

```bash
mkdir Express-CRUD
cd Express-CRUD
```
### Step 2: Initialize a Node.js Project

Run the following command to create a `package.json` file:

```bash
npm init -y
```

### Step 3: Install Express

Install Express.js by running:

```bash
npm install express
```

### Step 4: Set Up Express

In a new file `app.js`, set up an Express server:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Starting the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

we can now run the server by running this command `node app.js`

### Step 5: Create a POST Endpoint (Add Item)

We will use an in-memory array `items` to store data:

```js
let items = [];

app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send('Item added');
});
```


This endpoint allows us to add an item to the `items` array using `POST` requests.

### Step 6: Create a GET Endpoint (Get All Items)

This endpoint retrieves all items:

```js
app.get('/items', (req, res) => {
  res.json(items);
});
```
### Step 7: Create a GET Endpoint by ID (Get a Specific Item)

Retrieve an item by its ID:

```js
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});
```
### Step 8: Create a PUT Endpoint (Update Item)

This allows updating an existing item by ID:

```js
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    Object.assign(item, req.body);
    res.send('Item updated');
  } else {
    res.status(404).send('Item not found');
  }
});
```


### Step 9: Create a DELETE Endpoint (Delete Item)

This deletes an item by its ID:

```js
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items.splice(index, 1);
    res.send('Item deleted');
  } else {
    res.status(404).send('Item not found');
  }
});
```

### Step 10: Start the Server

In your terminal, run the server:

```bash
node app.js
```

The server will start listening on port 3000.

![server running](https://github.com/user-attachments/assets/973ba2ee-850e-4b3a-a02e-3fb1eb43facc)

### Step 11: Test the Endpoints using Postman

Use **Postman** to test the CRUD operations:

- **POST** `/items`: Add new items (JSON format: `{ "id": 1, "name": "Item 1" }`).
![post item added 1](https://github.com/user-attachments/assets/cfb03669-c8f9-484c-8b19-f7fd7bdaf056)
![post item added 2](https://github.com/user-attachments/assets/137eac95-18f8-4eca-9ed4-fdc2fed85260)
![post item added 3](https://github.com/user-attachments/assets/4cfb8956-8616-4238-8d5a-e5727ea035cd)

- **GET** `/items`: Retrieve all items.
![get all items](https://github.com/user-attachments/assets/edc857b1-43bb-45d8-b892-f8bcdd44c172)

- **GET** `/items/:id`: Retrieve an item by its ID.
    - Item found :
![get element by id (found)](https://github.com/user-attachments/assets/d0b3131d-4037-4476-a989-95ca6424ef05)
    - Item not found :
![get element by id (not found)](https://github.com/user-attachments/assets/ccfe2c3f-343d-4936-a346-86afd213a714)

- **PUT** `/items/:id`: Update an item (JSON format).
    - Updating item 1 :
![put updating item](https://github.com/user-attachments/assets/c15715db-4108-4565-bb84-ea96181d3184)
    - Item 1 updated :
![put item updated](https://github.com/user-attachments/assets/6139a12a-79f7-423e-ba44-0758019c1492)

- **DELETE** `/items/:id`: Delete an item by its ID.
    - Deleting item 3 :
![delete item](https://github.com/user-attachments/assets/cc7ae54f-c228-4886-a26a-a63fea25b4ce)
    - Item 3 deleted :
![item deleted from array](https://github.com/user-attachments/assets/583d14f7-1c3d-4e6b-8896-d7ba24e162e9)


## Conclusion

This simple CRUD application demonstrates how to set up an Express.js project, create routes for adding, retrieving, updating, and deleting items, and handle requests using middlewares and HTTP methods.