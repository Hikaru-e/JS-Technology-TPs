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