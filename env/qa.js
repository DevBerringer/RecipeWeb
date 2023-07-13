window.$env = {
    name: 'qa',
    hosts: {
        baseUrl: 'localhost:8082/v1/recipeCentral/',
        apis: {
            recipes: 'recipes',
            addRecipe: '/insert/recipe'
        }
    }
}