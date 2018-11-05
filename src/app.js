import express from 'express';
import bodyParse from 'body-parser';
import routes from './routes';
import database from './config/database';

const app = express();
const morgan = require('morgan');

const configureExpress = () => {

    app.use(morgan('dev'));
    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if(res.method =='OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
            return res.status(200).json({});
        }
        next();
    });
    

    app.use('/api/v1/', routes);

    app.use((req, res, next) => {
        const error = new Error('URL not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    });

    return app;
}



export default () => database.connect().then(configureExpress);