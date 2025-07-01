window.$env = {
  name: 'dev',
  hosts: {
    baseUrl: 'https://recipeprovider-production.up.railway.app',
    auth: {
      login: '/api/auth/signin',
      signOut: '/api/auth/signOut',
      register: '/api/auth/signup',
      check: '/api/test/user',
    },
    apis: {
      recipes: '/api/recipe/all',
      addRecipe: '/api/recipe/insert',
      users: '/api/user/all',
      updateUser: '/api/user/updateProfile',
      categories: '/api/categories/all',
    },
  },
};
