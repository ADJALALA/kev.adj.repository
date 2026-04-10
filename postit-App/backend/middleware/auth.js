const jwt = require('jsonwebtoken')

// Clé secrète pour signer les tokens
// En production, mets ça dans un fichier .env !
const SECRET = process.env.JWT_SECRET || 'postit_secret_key_2024'

function authMiddleware(req, res, next) {
  // On récupère le token dans le header Authorization
  // Le header ressemble à : "Bearer eyJhbGci..."
  const authHeader = req.headers.authorization

  // Si pas de token → on refuse l'accès
  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant' })
  }

  // On extrait le token (on enlève "Bearer ")
  const token = authHeader.split(' ')[1]

  try {
    // jwt.verify vérifie que le token est valide
    // et extrait les données dedans (ici l'id de l'utilisateur)
    const decoded = jwt.verify(token, SECRET)

    // On ajoute l'utilisateur décodé à la requête
    // pour pouvoir l'utiliser dans les routes
    req.user = decoded

    // next() passe à la route suivante
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' })
  }
}

module.exports = { authMiddleware, SECRET }