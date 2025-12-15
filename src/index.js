const app = require('./app');
const config = require('./config');

const PORT = config.app.port;
const HOST = config.app.host;

app.listen(app.get('port'), () => {
   console.log("servidor escuchando en el puerto ", app.get("port"));
});