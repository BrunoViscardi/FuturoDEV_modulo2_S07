const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Professor = connection.define("professores", {
    nome: {
        type: DataTypes.STRING
    },
    duracao: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cursos',
            key: 'id'
        }
    }
}, {
    paranoid: true
})

module.exports = Professor