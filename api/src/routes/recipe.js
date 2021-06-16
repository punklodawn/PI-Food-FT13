const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const { KEY, URL1, URL2 } = process.env;
const {Op} = require('sequelize')

const router = Router();

router.post('/recipe', async(req, res) => {
    const { name, summary, score, healthScore, instructions, image, diet } = req.body
    try {
        let newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            instructions,
            image,
            mine: true,
        })
        await newRecipe.addDiet(diet.id);
        res.json({message:"THE RECIPE ADDED SUCCESSFULLY"})
    } catch (err) {
        res.status(500).json(err);
    }
})


// router.get('/recipes/:id', async(req, res) => {
  
//         const {id} = req.params

//         let queryDB = await Recipe.findByPk(id, {
//             include: { model: Diet },
//         });

//         if(queryDB === null){

//             try{
                
//                 let recipesApi = await axios.get(`${URL1}${id}/information?apiKey=${KEY}`)

//                 const objeto = {
//                         name: recipesApi.data.title,
//                         summary: recipesApi.data.summary,
//                         score: recipesApi.data.spoonacularScore,
//                         healthScore: recipesApi.data.healthScore,
//                         instructions: recipesApi.data.instructions,
//                     }
        
//                     if (recipesApi)return res.send (objeto)
//             }
//             catch (err){
//                 return res.send ('ID NOT FOUND')
//             }
//         }
//         return res.send ('ESTA LA INFO EN LA BASE DE DATOS', queryDB)
// })


// router.get('/recipes', async (req ,res) =>{
//     try{
//         const {name} = req.query
//         let recipes = await Recipe.findAll();

//         if(recipes.length === 0){
//         recipes = await axios.get(`${URL2}addRecipeInformation=true&apiKey=${KEY}&number=9`)

//         recipes = await recipes.data.results.map(async (obj)=>{
//             const instructions = JSON.stringify(obj.analyzedInstructions)
//             const dietas =JSON.stringify(obj.diets)
//             await Recipe.create({
//                 name: obj.title,
//                 summary: obj.summary,
//                 score: obj.spoonacularScore,
//                 healthScore: obj.healthScore,
//                 instructions,
//                 image: obj.image,
//                 dietas,

//             })
//         })
//     }

//     if(!name){
//         const x9recipes = await Recipe.findAll({
//             inlcude: {model: Diet},
//             limit: 9,
//             offset: 0,
//         })
//         res.json(x9recipes)
//     }else{
//         const matchRecipe = await Recipe.findAll({
//             include: {model: Diet},
//             where: {name: {[Op.iLike]: `%${name}%`},
//         }
//         })
//         if (matchRecipe.length === 0){
//             res.json({message: "LA RECETA NO EXISTE",})
//         }else{
//             res.json(matchRecipe)
//         }
//     }
// }catch (err) {
//     console.error(err.message)
// }
// })

module.exports = router;