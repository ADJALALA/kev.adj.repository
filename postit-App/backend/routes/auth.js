// routes/auth.js
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { SECRET } = require('../middleware/auth')

const router = express.Router()

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  try {
    // Vérifie si l'email existe déjà dans MySQL
    const exists = await User.findOne({ where: { email } })
    if (exists) {
      return res.status(400).json({ message: 'Email déjà utilisé' })
    }

    // Chiffre le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crée l'utilisateur dans MySQL
    // Sequelize fait le INSERT INTO users automatiquement
    await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'Compte créé avec succès' })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Cherche l'utilisateur dans MySQL
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
    }

    // Vérifie le mot de passe
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
    }

    // Crée le token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router