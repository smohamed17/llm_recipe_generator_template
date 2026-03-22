const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')


// this will focus on the homepage.
router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})


// this will receive the information and request.
router.post('/generate_recipe', function(req, res, next){
    let formData = req.body
    let userIngredients = formData.ingredients
    console.log(`User entered:`, userIngredients)

    // this will make a Gemini request.
    generateRecipe(userIngredients).then( recipeJSON => {
        return res.render('recipe_result', { userIngredients: userIngredients, recipeJSON: recipeJSON })
    }).catch(err => { // this will hand off the request to the error handler.
        return next(err)
    })

})

module.exports = router


