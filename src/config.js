require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'

    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB ||'smart_video'
    },
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3001'
    }    
};