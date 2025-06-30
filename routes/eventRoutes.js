const express = require('express');
const {
    addEvent, getEvents, joinEvent, getMyEvents, updateEvent, deleteEvent,
} = require('../controller/eventController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addEvent);
router.get('/', protect, getEvents);
router.put('/join/:id', protect, joinEvent);
router.get('/my-events', protect, getMyEvents);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
