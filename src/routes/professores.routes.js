const {Router} = require('express')
const ProfessorController = require('../controllers/ProfessorController')

const professoresRoutes = new Router()

professoresRoutes.post('/', ProfessorController.criar)
professoresRoutes.get('/', ProfessorController.listar)
//professoresRoutes.put('/:id', ProfessorController.atualizar)
//professoresRoutes.delete('/:id', ProfessorController.deletar)



module.exports = professoresRoutes