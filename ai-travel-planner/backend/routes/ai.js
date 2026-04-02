import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', auth, async (req, res) => {
  const { destination, days, budget, travelers } = req.body
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `Create a ${days}-day travel plan for ${destination} for ${travelers} with a ${budget} budget.
    Return ONLY a valid JSON object with this exact structure, no markdown:
    {
      "destination": "${destination}",
      "duration": "${days} days",
      "budget": "${budget}",
      "hotels": [
        { "name": "", "address": "", "price": "", "rating": "", "description": "" }
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "",
          "places": [
            { "name": "", "details": "", "timing": "", "ticketPrice": "" }
          ]
        }
      ]
    }`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const cleaned = text.replace(/```json|```/g, '').trim()
    const tripData = JSON.parse(cleaned)
    res.json(tripData)
  } catch (err) {
    console.log('AI ERROR:', err.message)   
    res.status(500).json({ message: err.message })
  }
})

export default router