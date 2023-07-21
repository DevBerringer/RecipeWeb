export {};

declare global {
  interface Window {
    $env: {
      name: string;
      hosts: {
        baseUrl: string;
        auth: {
          login: string;
          register: string;
          check: string;
        };
        apis: {
          users: string;
          recipes: string;
          addRecipe: string;
        };
      };
    };
  }
}
