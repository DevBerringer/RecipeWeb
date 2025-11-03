window.$env = {
  name: 'dev',
  hosts: {
    baseUrl: 'cozycookbook-production.up.railway.app',
    auth: {
      login: '/api/auth/signin',
      signOut: '/api/auth/signout',
      register: '/api/auth/signup',
      check: '/api/test/user',
      forgotPassword: '/api/auth/forgot-password',
      refresh: '/api/auth/refresh', // Bearer token refresh endpoint
    },
    apis: {
      recipe: '/api/recipe/{id}',
      pagedRecipes: '/api/recipe/paged',
      addRecipe: '/api/recipe/insert',
      users: '/api/user/all',
      updateUser: '/api/user/updateProfile',
      categories: '/api/categories/all',
      uploadImage: '/api/image/upload-image',
    },
  },
};
