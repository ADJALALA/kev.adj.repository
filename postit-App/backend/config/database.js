const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
)

module.exports = sequelize

// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('postit_db', 'root', 'motdepasse', 
//     {
//         host: 'localhost', 
//         dialect: 'mysql',
//         logging: false
//     }
// )
// module.exports = sequelize