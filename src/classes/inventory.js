const Recipe = require('./recipe');


class Inventory {
  constructor() {
    this.payload = {
      currentInventory: Recipe.allIngredients
        .map(ingredient => Object.assign({ quantity: 10 }, ingredient)),
    };
  }

  findIngredientById(id) {
    const ingredient = this.payload.currentInventory.find(i => i.id === id);
    if (!ingredient) { throw new Error('Unknown Ingredient'); }
    return ingredient;
  }

  deduct(id, quantity) {
    const ingredient = this.findIngredientById(id);
    ingredient.quantity -= quantity;
  }

  checkAvailability(id, quantity) {
    const ingredient = this.findIngredientById(id);
    return (ingredient.quantity - quantity >= 0);
  }

  format() {
    return this.payload.currentInventory;
  }
}


module.exports = Inventory;
