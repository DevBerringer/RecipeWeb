window.$env = {
  name: 'dev',
  hosts: {
    //baseUrl: 'localhost:8082',
    baseUrl: 'cozycookbook-production.up.railway.app',
    auth: {
      login: '/api/auth/signin',
      signOut: '/api/auth/signout',
      register: '/api/auth/signup',
      check: '/api/test/user',
      forgotPassword: '/api/auth/forgot-password'
    },
    apis: {
      recipe: '/api/recipe/{id}',
      recipes: '/api/recipe/all',
      pagedRecipes: 'api/recipe/paged',
      addRecipe: '/api/recipe/insert',
      users: '/api/user/all',
      updateUser: '/api/user/updateProfile',
      categories: '/api/categories/all',
      uploadImage: '/api/image/upload-image',
    },
  },
};
//this one
