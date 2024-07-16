const Professor = require("../models/Professor")
const Curso= require("../models/Curso")


class ProfessorController {



    async criar(request, response) {
        try {
            const dados = request.body

            //Validação: Colunas obrigatórias
            if (!dados.nome) {
                return response.status(400).json({
                    mensagem: 'O Nome do professor é obrigatório'
                })
            }

            //Validação se existe id de curso cadastrado
            const cursoExistente = await Curso.findByPk(dados.cursoID);
            if (dados.cursoID && !cursoExistente) {
                return response.status(400).json({ mensagem: 'Insira um ID de curso válido' });
            }

            const professor = await Professor.create(dados)
            response.status(201).json(professor)
        } catch (error) {
            console.log(error)
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o professor', error
            })
        }
    }



    // async listar(request, response) {
    //     try {
    //         const dados = request.query;

    //         //Listar por filtragem de busca
    //         if (dados && (dados.nome || dados.duracao)) {
    //             if (dados.nome && dados.duracao) {
    //                 const professor = await Professor.findOne({
    //                     where: {
    //                         nome: dados.nome,
    //                         duracao: dados.duracao
    //                     }
    //                 });

    //                 if (!professor) {
    //                     return response.status(400).json({
    //                         mensagem: 'Não foi encontrado um professor com esse nome e duração'
    //                     });
    //                 }

    //                 return response.json(professor);
    //             } else {
    //                 return response.status(400).json({
    //                     mensagem: 'Nome e duração são necessários para a busca'
    //                 });
    //             }
    //         } else {

    //             //Listar todos sem filtragem
    //             const professores = await Professor.findAll({
    //                 attributes: [
    //                     ['id', 'identificador'],
    //                     'nome',
    //                     'duracao'
    //                 ],
    //                 order: [['duracao', 'DESC']]
    //             });
    //             response.json(professores);
    //         }

    //     } catch (error) {
    //         console.error('Erro ao listar os professores:', error);
    //         response.status(500).json({
    //             mensagem: 'Houve um erro ao listar os professores'
    //         });
    //     }
    // }



    // async atualizar(request, response) {
    //     try {
    //         const id = request.params.id
    //         const dados = request.body

    //         const professor = await Professor.findByPk(id)

    //         if (!professor) {
    //             response.status(404).json({ mensagem: 'Não foi encontrado o professor' })
    //         }

    //         //Validação: Duração é um numero inteiro
    //         if (dados.duracao && !Number.isInteger(dados.duracao)) {
    //             return response.status(400).json({
    //                 mensagem: 'A Duração do professor deve ser um número inteiro'
    //             })
    //         }
            

    //         professor.nome = dados.nome
    //         professor.duracao = dados.duracao
    //         await professor.save()

    //         response.status(200).json({ mensagem: 'Atualizado com sucesso' })

    //     } catch (error) {
    //         response.status(500).json({
    //             mensagem: 'Houve um erro ao atualizar o professor'
    //         })
    //     }
    // }



    // async deletar(request, response) {
    //     try {
    //         const id = request.params.id
    //         const professor = await Professor.findByPk(id)

    //         if (!professor) {
    //             response.status(404).json({ mensagem: 'Não foi encontrado o professor' })
    //         }

    //         await professor.destroy()

    //         response.status(204).json()

    //     } catch (error) {
    //         response.status(500).json({
    //             mensagem: 'Houve um erro ao deletar o professor'
    //         })
    //     }
    // }



    


}

module.exports = new ProfessorController()