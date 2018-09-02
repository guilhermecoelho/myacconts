import express from 'express';

import checkOut from '../middleware/check-auth';
import BillsController from '../controllers/bills';
import Bill from '../models/bill';

const router = express.Router();

const billsController = new BillsController(Bill);

router.get('/', checkOut, (req, res) => billsController.get(req, res));
router.get('/:id', checkOut, (req, res) => billsController.getById(req, res));
router.post('/', checkOut, (req, res) => billsController.create(req, res));
router.put('/:id', checkOut, (req, res) => billsController.update(req, res));
router.delete('/:id', checkOut, (req, res) => billsController.remove(req, res));

export default router;