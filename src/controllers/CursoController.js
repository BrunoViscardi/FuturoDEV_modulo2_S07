const Curso = require("../models/Curso")


class CursoController {

    

    async criar(request, response) {
        try {
            const dados = request.body

            //Validação: Colunas obrigatórias
            if (!dados.nome || !dados.duracao) {
                return response.status(400).json({
                    mensagem: 'O Nome do curso e sua Duração são obrigatórios '
                })
            }

            //Validação: Duração é um numero inteiro
            if (!Number.isInteger(dados.duracao)) {
                return response.status(400).json({
                    mensagem: 'A Duração do curso deve ser um número inteiro'
                })
            }
            
            const curso = await Curso.create(dados)
            response.status(201).json(curso)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o curso', error
            })
        }
    }

    
}

module.exports = new CursoController()