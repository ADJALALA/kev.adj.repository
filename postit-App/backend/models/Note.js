const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Nouvelle note'
  },

  content: {
    type: DataTypes.TEXT,   
    defaultValue: ''
  },

  color: {
    type: DataTypes.STRING,
    defaultValue: '#fef08a'
  }
})

Note.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Note, { foreignKey: 'userId' })

module.exports = Note