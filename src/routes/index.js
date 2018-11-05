import express from 'express';
import swaggerUi from 'swagger-ui-express';

import billsRoute from './bills';
import userssRoute from './users';
import swaggerDocument from './../../swagger.json';

const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//router.get('/', (req, res) => res.send('hello'));
router.use('/bills', billsRoute);
router.use('/users', userssRoute);

export default router;

