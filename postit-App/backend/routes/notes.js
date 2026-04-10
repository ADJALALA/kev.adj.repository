// routes/notes.js
const express = require('express')
const Note = require('../models/Note')
const { authMiddleware } = require('../middleware/auth')

const router = express.Router()

// Toutes les routes sont protégées
router.use(authMiddleware)

// GET /notes → notes de l'utilisateur connecté
router.get('/', async (req, res) => {
  try {
    // Sequelize fait : SELECT * FROM notes WHERE userId = req.user.id
    const notes = await Note.findAll({
      where: { userId: req.user.id }
    })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// POST /notes
router.post('/', async (req, res) => {
  try {
    // Sequelize fait : INSERT INTO notes (...)
    const note = await Note.create({
      ...req.body,
      userId: req.user.id  // associe la note à l'utilisateur connecté
    })
    res.status(201).json(note)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// PUT /notes/:id
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })

    if (!note) {
      return res.status(404).json({ message: 'Note introuvable' })
    }

    // Sequelize fait : UPDATE notes SET ... WHERE id = ...
    await note.update(req.body)
    res.json(note)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// DELETE /notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })

    if (!note) {
      return res.status(404).json({ message: 'Note introuvable' })
    }

    // Sequelize fait : DELETE FROM notes WHERE id = ...
    await note.destroy()
    res.json({ message: 'Note supprimée' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// DELETE /notes
router.delete('/', async (req, res) => {
  try {
    // Sequelize fait : DELETE FROM notes WHERE userId = ...
    await Note.destroy({
      where: { userId: req.user.id }
    })
    res.json({ message: 'Toutes les notes supprimées' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router