const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');


const router = Router();

router.post('/recipe', async(req, res) => {
    const { name, summary, score, healthScore, instructions, image, mine } = req.body

    try {
        let newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            instructions,
            image,
            mine
        })

        res.json(newRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/recipes/:id', async(req, res) => {
    let { id } = req.params
    try {
        let query = await Recipe.findByPk(id, {
            include: { model: Diet },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
                attributes: [],
            }
        });
        if (query) {
            res.json(query);
        } else {
            res.status(404).json('not found')
        }
    } catch (err) {
        res.status(500).json({ err })
    }

})

module.exports = router;