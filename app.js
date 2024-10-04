const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const booksRouter =  require('./routes/books');
const cartsRouter =  require('./routes/cart');
const likesRouter =  require('./routes/likes');
const ordersRouter =  require('./routes/orders');
const usersRouter =  require('./routes/users');
const db = require('./mariadb')

app.use('/', booksRouter);
app.use('/', cartsRouter);
app.use('/', likesRouter);
app.use('/', ordersRouter);
app.use('/', usersRouter);