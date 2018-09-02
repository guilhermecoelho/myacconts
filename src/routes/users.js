import express from 'express';

import checkOut from '../middleware/check-auth';
import UsersController from '../controllers/users';
import User from '../models/user';

const router = express.Router();

const usersController = new UsersController(User);

router.post('/', (req, res) => usersController.create(req, res));
router.post('/login', (req, res) => usersController.login(req, res));
router.delete('/:id', checkOut, (req, res) => usersController.remove(req, res));


export default router;