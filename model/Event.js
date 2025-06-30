const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    name: String,
    dateTime: Date,
    location: String,
    description: String,
    attendeeCount: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Event', eventSchema);
