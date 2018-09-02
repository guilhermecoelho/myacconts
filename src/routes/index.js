import express from 'express';
import billsRoute from './bills';
import userssRoute from './users';

const router = express.Router();

router.get('/', (req, res) => res.send('hello'));
router.use('/bills', billsRoute);
router.use('/users', userssRoute);

export default router;
