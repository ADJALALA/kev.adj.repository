require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes')

// importation des modèles pour que Sequelize
// les enregistre avant de créer les tables
require('./models/User')
require('./models/Note')


const app = express()


// Le port vient de Railway automatiquement
app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Serveur démarré sur le port ${process.env.PORT || 3000}`)
})

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', notesRoutes)

// sequelize.sync() crée les tables dans MySQL si elles n'existent pas
// force: false → ne recrée pas les tables si elles existent déjà
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Base de données connectée et tables créées')
    app.listen(3000, () => {
      console.log('✅ Serveur démarré sur http://localhost:3000')
    })
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MySQL :', err.message)
  })