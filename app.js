const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const bodyParser = require('body-parser');
const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const orderRouter = require('./routes/orderRoutes');
const infoRouter = require('./routes/infoRoutes');
const complaintRouter = require('./routes/complaintRoutes');
const contractRouter = require('./routes/contractRoutes');
const overviewRouter = require('./routes/overviewRoutes');

const env = dotenv.config({ path: './config.env' });
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Hello from middleware!');
    next();
});

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/ratings', ratingRouter);
app.use('/orders', orderRouter);
app.use('/info', infoRouter);
app.use('/complaint', complaintRouter);
app.use('/contract', contractRouter);
app.use('/overview', overviewRouter);


app.all('*', (req, res, next) => {
    return next(new AppError('This route is not exist', 404));
})


module.exports = app;