const bodyParser = require('body-parser');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const { catchAll, notFound } = require('./helpers/error');

const app = express();
const userRouter = require('./routes/gatewayRoutes');

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Working !' });
});

app.use('/api/gateways', userRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
