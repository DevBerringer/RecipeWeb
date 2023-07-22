window.$env = {
    name: 'dev',
    hosts: {
        baseUrl: 'localhost:8082',
        auth: {
            login: '/api/auth/signin',
            signOut: '/api/auth/signOut',
            register: '/api/auth/signup',
            check: '/api/test/user'
        },
        apis: {
            recipes: '/api/recipe/all',
            addRecipe: '/api/recipe/insert',
            users: '/api/user/all'
        }
    }
}