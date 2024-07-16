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



    async listar(request, response) {
        try {
            const dados = request.query;

            //Listar por filtragem de busca
            if (dados && (dados.nome || dados.duracao)) {
                if (dados.nome && dados.duracao) {
                    const curso = await Curso.findOne({
                        where: {
                            nome: dados.nome,
                            duracao: dados.duracao
                        }
                    });

                    if (!curso) {
                        return response.status(400).json({
                            mensagem: 'Não foi encontrado um curso com esse nome e duração'
                        });
                    }

                    return response.json(curso);
                } else {
                    return response.status(400).json({
                        mensagem: 'Nome e duração são necessários para a busca'
                    });
                }
            } else {

                //Listar todos sem filtragem
                const cursos = await Curso.findAll({
                    attributes: [
                        ['id', 'identificador'],
                        'nome',
                        'duracao'
                    ],
                    order: [['duracao', 'DESC']]
                });
                response.json(cursos);
            }

        } catch (error) {
            console.error('Erro ao listar os cursos:', error);
            response.status(500).json({
                mensagem: 'Houve um erro ao listar os cursos'
            });
        }
    }

    


}

module.exports = new CursoController()