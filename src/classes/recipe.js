const _ = require('lodash');


const INGREDIENTS = [
  { id: 1, name: 'Huile de Vidange' },
  { id: 2, name: 'Concombre de Mer' },
  { id: 3, name: 'Bave de crapaud' },
  { id: 4, name: 'Blanche Colombe' },
  { id: 5, name: 'Cheveu de Alain Juppé' },
  { id: 6, name: 'Fragment de vaisseau spatial' },
  { id: 7, name: 'Laser' },
  { id: 8, name: 'Compile de Patrick Sebastien' },
  { id: 9, name: 'Page de catalogue la redoute' },
  { id: 10, name: 'Cuir de ballon de la coupe du monde 98' },
  { id: 11, name: 'Poivre' },
  { id: 12, name: 'Ecorce de platane' },
  { id: 13, name: '1 kg de chlore' },
  { id: 14, name: 'Un bon tuyau' },
  { id: 15, name: 'Une chaussette de pere noel' },
  { id: 16, name: 'Une fraise du Sahara' },
  { id: 17, name: 'Des glaçons' },
];

const RECIPES = [
  { id: 1, name: 'Filtre d\'amour', ingredients: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }, { id: 3, quantity: 1 }] },
  { id: 2, name: 'Polynectar', ingredients: [{ id: 4, quantity: 1 }, { id: 5, quantity: 1 }, { id: 6, quantity: 1 }] },
  { id: 3, name: 'Potion d\'amnésie (GHB)', ingredients: [{ id: 2, quantity: 1 }, { id: 4, quantity: 1 }, { id: 6, quantity: 1 }] },
  { id: 4, name: 'Potion magique', ingredients: [{ id: 17, quantity: 1 }, { id: 16, quantity: 1 }, { id: 15, quantity: 1 }] },
  { id: 5, name: 'Elixir d\'euphorie', ingredients: [{ id: 5, quantity: 1 }, { id: 10, quantity: 1 }, { id: 15, quantity: 1 }] },
  { id: 6, name: 'Antidote universel', ingredients: [{ id: 7, quantity: 1 }, { id: 13, quantity: 1 }, { id: 17, quantity: 1 }] },
  { id: 7, name: 'Aspirine', ingredients: [{ id: 3, quantity: 1 }, { id: 6, quantity: 1 }, { id: 9, quantity: 1 }] },
];


class Recipe {
  static get allIngredients() {
    return _.cloneDeep(INGREDIENTS);
  }

  static get allRecipes() {
    return _.cloneDeep(RECIPES);
  }

  static craft(ingredients) {
    let matchingRecipes = Recipe.allRecipes;
    // Remove in mutli operations recipes that does not include current ingredient;
    ingredients.forEach((ingredient) => {
      matchingRecipes = matchingRecipes
        .filter(recipe => _.find(recipe.ingredients, recipeIngredient => (
          recipeIngredient.id === ingredient.id && recipeIngredient.quantity === ingredient.quantity
        )));
    });
    if (!matchingRecipes.length) return null;
    return matchingRecipes[0];
  }
}

module.exports = Recipe;
