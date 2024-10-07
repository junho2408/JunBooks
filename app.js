const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const usersRouter =  require('./routes/users');
const booksRouter =  require('./routes/books');
const categoryRouter = require('./routes/category');
const cartsRouter =  require('./routes/cart');
const likesRouter =  require('./routes/likes');
const ordersRouter =  require('./routes/orders');
const db = require('./mariadb')

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/category', categoryRouter);
app.use('/likes', likesRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);