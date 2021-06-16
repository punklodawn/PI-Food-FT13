const axios = require('axios');
const { Router } = require('express');
const { Diet } = require('../db.js');
const { KEY } = process.env;

const router = Router();


router.get('/types', async(req, res) => {
     let name = req.body

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