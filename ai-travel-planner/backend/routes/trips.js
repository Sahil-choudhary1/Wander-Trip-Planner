import express from 'express'
import Trip from '../models/Trip.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Get all trips for logged in user
router.get('/', auth, async (req, res) => {
  const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 })
  res.json(trips)
})

// Get one trip
router.get('/:id', auth, async (req, res) => {
  const trip = await Trip.findById(req.params.id)
  res.json(trip)
})

// Save a trip
router.post('/', auth, async (req, res) => {
  const trip = await Trip.create({ userId: req.userId, ...req.body })
  res.json(trip)
})

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id)
  res.json({ message: 'Trip deleted' })
})

export default router