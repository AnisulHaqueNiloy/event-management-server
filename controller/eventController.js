const Event = require('../model/Event');

// Add event
exports.addEvent = async (req, res) => {
    const { title, name, dateTime, location, description } = req.body;
    try {
        const event = await Event.create({
            title, name, dateTime, location, description, user: req.user._id,
        });
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Add event failed' });
    }
};

// Get all events with filters and search
exports.getEvents = async (req, res) => {
    const { search = '', filter } = req.query;
    const now = new Date();
    let filterQuery = { title: { $regex: search, $options: 'i' } };

    // Handle filters
    if (filter === 'today') {
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        filterQuery.dateTime = { $gte: start, $lte: end };
    }

    // Add more filter logic for week/month as needed

    try {
        const events = await Event.find(filterQuery).sort({ dateTime: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Fetching events failed' });
    }
};

// Join event
exports.joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Prevent duplicate join by storing user IDs or similar in production
        event.attendeeCount += 1;
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Join failed' });
    }
};

// Get user's events
exports.getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user._id }).sort({ dateTime: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Fetching my events failed' });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed' });
    }
};
