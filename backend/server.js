const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//routes import
const routes = require('./routes/routes.js');

const app = express();

//connecting db
mongoose.connect('mongodb://localhost/listadoDb')
  .then(db => console.log('Conncected to database'))
  .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/', routes);

//start server
app.listen(app.get('port'), () => {
  console.log(`Server port: ${app.get('port')}`);
});
