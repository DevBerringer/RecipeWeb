window.$env = {
  name: 'dev',
  hosts: {
    //baseUrl: 'localhost:8082',
    baseUrl: 'recipeprovider-production.up.railway.app',
    auth: {
      login: '/api/auth/signin',
      signOut: '/api/auth/signout',
      register: '/api/auth/signup',
      check: '/api/test/user',
    },
    apis: {
      recipe: '/api/recipe/{id}',
      recipes: '/api/recipe/all',
      pagedRecipes: 'api/recipe/paged',
      addRecipe: '/api/recipe/insert',
      users: '/api/user/all',
      updateUser: '/api/user/updateProfile',
      categories: '/api/categories/all',
    },
  },
};
//this one
