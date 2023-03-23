// Regras de negócio aqui

const router = require('express').Router(); // importar o router do express

const Person = require('../models/Person'); // importar o model Person

// Create - criar dados no sistema
router.post('/', async (req, res) => {
    
    // req.body = corpo da requisicao por onde vai chegar os dados
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error: 'Nome e obrigatorio'}); // 422 = erro de validacao
    }

    // criar um novo objeto
    const person = {
        name,
        salary,
        approved
    };

    // create = cria os dados no sistema

    try {

        await Person.create(person); // espera requisicao terminar

        res.status(201).json({message: 'Pessoa criada com sucesso'}); // 201 = criado com sucesso
        
    } catch (error) {
        res.status(500).json({error: error}); // erro generico
    }

});

// Read - ler dados do sistema
router.get('/', async (req, res) => {

    try {

        const people = await Person.find(); // espera requisicao terminar

        res.status(200).json(people); // 200 = ok
        
    } catch (error) {
        res.status(500).json({error: error}); // erro generico
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id; // pegar o id da requisicao

    try {
        const person = await Person.findOne({_id: id});

        if(!person){
            res.status(422).json({error: 'Pessoa nao encontrada'});
            return
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: error}); // erro generico
    }
    
});

// Update - atualizar dados do sistema (PUT - objeto completo / PATCH - objeto parcial)
router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try {
        
        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount === 0){ 
            res.status(422).json({error: 'Pessoa nao encontrada'});
            return
        }

        res.status(200).json(updatedPerson);

    } catch (error) {
        res.status(500).json({error: error}); // erro generico
    }

});

// Delete - deletar dados do sistema
router.delete('/:id', async (req, res) =>{

    const id = req.params.id;

    const person = await Person.findOne({_id: id});

    if(!person){ // retorna a requisicao se o id nao existir
        res.status(422).json({error: 'Pessoa nao encontrada'});
        return
    }

    try {

        await Person.deleteOne({_id: id});

        res.status(200).json({message: 'Pessoa deletada com sucesso'});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router;