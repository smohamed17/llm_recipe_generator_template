// this will request the LLM.
let { GoogleGenAI, Type } = require('@google/genai') // we added the TYPE to the required gemini AI tool.

let genAI = new GoogleGenAI( {} )

function generateRecipe(ingredients) {

    let prompt = `Suggest one recipe that uses these ingredients. Ingredients: ${ingredients}`

// we are returning to the generated content.
    return genAI.models.generateContent({
        model: 'gemini-2.5-flash', // this will be the model that will be used from Gemini.
        contents: prompt, // this is from the previous string above.
        config: {
            systemInstructions: `You are a recipe suggestion bot for a health-conscious, budget-friendly website. 
            Suggest recipes that are low cost but use healthy ingredients. 
            Only edible food ingredients please. 
            Please display a warning to the consume for non-food items. 
            Alert the consume for any dietary allergens. 
            Do not suggest the following options: Non-food items, tools, imagination creation or anything malicious. `,
            responseMimeType: 'application/json', // this will response in a JSON format.
            responseSchema: {
                type: Type.OBJECT, // this will focus on the type.
                properties: { // the properties will provide a structure to the prompt and terminal below.
                    recipeName: { // this will provide the recipe name on the terminal.
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    nutritionalFacts: {
                        type: Type.STRING
                    },
                    allergens: {
                        type: Type.STRING
                    },
                    ingredients: { // this will provide the ingredients in an array and string.
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: { // this will provide the array and string for the instructions.
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                } // so many object and curvy braces in this code.

            }
        }// this will provide the contents that you want to display on the AI prompt.
    }).then(response => {
        console.log(response.text)
        let recipe = JSON.parse(response.text)
        console.log(recipe)
        return recipe
        //let recipe = JSON.parse(response.text) // this will parse through the response.
    }) // this is an example of prompt engineering.

}
// this will export the generate recipe on the webpage.
module.exports = generateRecipe