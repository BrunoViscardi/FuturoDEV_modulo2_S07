const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Professor = connection.define("professores", {
    nome: {
        type: DataTypes.STRING
    },
    cursoID: {
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