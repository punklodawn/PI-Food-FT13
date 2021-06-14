const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const { KEY } = process.env;
const {Op} = require('sequelize')

const router = Router();

router.post('/recipe', async(req, res) => {
    const { name, summary, score, healthScore, instructions, diet } = req.body

    try {
        let newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            instructions,
        })
        await newRecipe.addDiet(diet);
        res.json(newRecipe)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/recipes/:id', async(req, res) => {
  
        const {id} = req.params

        let queryDB = await Recipe.findByPk(id, {
            include: { model: Diet },
        });

        if(queryDB === null){

            try{
                
                let recipesApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`)

                const objeto = {
                        name: recipesApi.data.title,
                        summary: recipesApi.data.summary,
                        score: recipesApi.data.spoonacularScore,
                        healthScore: recipesApi.data.healthScore,
                        instructions: recipesApi.data.instructions,
                    }
        
                    if (recipesApi)return res.send (objeto)
            }
            catch (err){
                return res.send ('ID NOT FOUNT')
            }
        }
        return res.send ('ESTA LA INFO EN LA BASE DE DATOS')
})


router.get('/recipes', async (req ,res) =>{
    try{
        const {name} = req.query
        let recipes = await Recipe.findAll();

        if(recipes.length === 0){
        recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${KEY}&number=10`)

        recipes = await recipes.data.results.map(async (obj)=>{
            await Recipe.create({
                name: obj.title,
                summary: obj.summary,
                score: obj.spoonacularScore,
                healthScore: obj.healthScore,
            })
        })
    }

    if(!name){
        const x9recipes = await Recipe.findAll({
            inlcude: {model: Diet},
            limit: 10,
            offset: 0,
        })
        res.json(x9recipes)
    }else{
        const matchRecipe = await Recipe.findAll({
            include: {model: Diet},
            where: {name: {[Op.iLike]: `%${name}%`},
        }
        })
        if (matchRecipe.length === 0){
            res.json({message: "LA RECETA NO EXISTE",})
        }else{
            res.json(matchRecipe)
        }
    }
}catch (err) {
    console.error(err.message)
}
})

module.exports = router;