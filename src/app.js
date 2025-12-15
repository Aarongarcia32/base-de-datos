const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const usuario = require('./modulos/usuario/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/error');

const app = express(); 


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded ({extended: true}));
app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use('/api/auth', auth);


app.use(express.json());


//config
app.set('port', config.app.port)

//rutas
app.use('/api/usuario', usuario)
app.get('/', (req, res) => {
  res.send('API funcionando');
});
app.use(error);

module.exports = app;