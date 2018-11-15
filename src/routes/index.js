import express from 'express';
import swaggerUi from 'swagger-ui-express';

import billsRoute from './bills';
import swaggerDocument from './../../swagger.json';

const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/bills', billsRoute);

export default router;

