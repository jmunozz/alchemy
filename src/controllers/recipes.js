const Recipe = require('../classes/recipe');


const all = (req, res) => {
  res.json({ recipes: Recipe.allRecipes });
};

module.exports = {
  all,
};
