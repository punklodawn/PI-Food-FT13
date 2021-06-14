const axios = require('axios');
const { Router } = require('express');
const { Diet } = require('../db.js');
const { KEY } = process.env;

const router = Router();

// const data = async() => {
//     const arr = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&diet`);
//     return arr.data.results
// }

router.get('/types', async(req, res) => {
     let name = req.body
    // console.log(name)
    // const apiDiet = await data();

    // for (let i = 0; i < apiDiet.length; i++) {
    //     await Diet.findOrCreate({
    //         where: {
    //             name: apiDiet[i].title,

    //         }
    //     })
    // }
    if (name) {
        try {
            let diet = await Diet.findAll()
            console.log("Diet: " + diet);
            return res.json(diet)
        } catch (error) {
            console.log(error)
        }
    }

})
module.exports = router;