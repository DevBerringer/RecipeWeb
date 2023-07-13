export {};

declare global {
  interface Window {
    $env: {
      name: string;
      hosts: {
        baseUrl: string;
        apis: {
          recipes: string;
          addRecipe: string;
        };
      };
    };
  }
}
