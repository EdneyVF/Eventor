const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    res.status(400);
    throw new Error('Por favor, preencha todos os campos obrigatórios');
  }

  const newEvent = await Event.create({
    title,
    description,
    date,
    location,
  });

  res.status(201).json(newEvent);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Evento não encontrado');
  }

  res.status(200).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Evento não encontrado');
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Evento não encontrado');
  }

  await event.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Evento deletado com sucesso' });
});

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};