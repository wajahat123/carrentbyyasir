const express = require('express');
const BookingController = require('../controller/bookingController');

const router = express.Router();

router.post('/', BookingController.create);
router.get('/', BookingController.getAll);
router.get('/:id', BookingController.getById);
router.put('/:id', BookingController.update);
router.delete('/:id', BookingController.delete);

module.exports = router;