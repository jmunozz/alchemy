const _ = require('lodash');


const INGREDIENTS = [{ id: 1, name: 'Huile de Vidange', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/fuel.png' },
  { id: 2, name: 'Concombre de Mer', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/cucumber.png' },
  { id: 3, name: 'Bave de crapaud', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/frog.png' },
  { id: 4, name: 'Blanche Colombe', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/dove.png' },
  { id: 5, name: 'Cheveu de Alain Juppé', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/hairdresser.png' },
  { id: 6, name: 'Fragment de vaisseau spatial', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/ufo.png' },
  { id: 7, name: 'Laser', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/laser.png' },
  { id: 8, name: 'Compile de Patrick Sebastien', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/compact-disc.png' },
  { id: 9, name: 'Page de catalogue la redoute', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/magazine.png' },
  { id: 10, name: 'Cuir de ballon de la coupe du monde 98', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/football.png' },
  { id: 11, name: 'Poivre', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/pepper.png' },
  { id: 12, name: 'Ecorce de platane', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/tree.png' },
  { id: 13, name: '1 kg de chlore', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/washing-powder.png' },
  { id: 14, name: 'Un bon tuyau', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/pipe.png' },
  { id: 15, name: 'Une chaussette de pere noel', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/christmas-sock.png' },
  { id: 16, name: 'Une fraise du Sahara', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/strawberry.png' },
  { id: 17, name: 'Des glaçons', image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/ice.png' },
];

const RECIPES = [
  {
    id: 1, name: 'Filtre d\'amour', ingredients: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }, { id: 3, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/potion.png',
  },
  {
    id: 2, name: 'Polynectar', ingredients: [{ id: 4, quantity: 1 }, { id: 5, quantity: 1 }, { id: 6, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/potion-3.png',
  },
  {
    id: 3, name: 'Potion d\'amnésie (GHB)', ingredients: [{ id: 2, quantity: 1 }, { id: 4, quantity: 1 }, { id: 6, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/potion-2.png',
  },
  {
    id: 4, name: 'Potion magique', ingredients: [{ id: 17, quantity: 1 }, { id: 16, quantity: 1 }, { id: 15, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/potion-1.png',
  },
  {
    id: 5, name: 'Elixir d\'euphorie', ingredients: [{ id: 5, quantity: 1 }, { id: 10, quantity: 1 }, { id: 15, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/poison.png',
  },
  {
    id: 6, name: 'Antidote universel', ingredients: [{ id: 7, quantity: 1 }, { id: 13, quantity: 1 }, { id: 17, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/bottle.png',
  },
  {
    id: 7, name: 'Aspirine', ingredients: [{ id: 3, quantity: 1 }, { id: 6, quantity: 1 }, { id: 9, quantity: 1 }], image_url: 'https://s3-eu-west-1.amazonaws.com/jmunoz-alchemy/bottle.png',
  },
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
