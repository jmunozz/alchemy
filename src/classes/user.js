const uuid = require('uuid/v4');
const hash = require('hash-string');
const _ = require('lodash');

const Inventory = require('./inventory');
const Recipe = require('./recipe');
const Errors = require('../libs/errors');


const allUsers = [];


class User {
  constructor(username, password) {
    this.payload = {
      username,
      password: hash(password),
      id: uuid(),
      crafted: [],
      inventory: new Inventory(),
    };
    User.allUsers.push(this);
  }

  static get allUsers() {
    return allUsers;
  }

  static getUserById(id) {
    return User.allUsers.find(user => user.payload.id === id);
  }

  static getUserByUsername(username) {
    return User.allUsers.find(user => user.payload.username === username);
  }

  reset() {
    this.payload.crafted = [];
    this.payload.inventory = new Inventory();
  }

  craft(ingredients) {
    // Check availability
    ingredients.forEach((ingredient) => {
      if (!this.payload.inventory.checkAvailability(ingredient.id, ingredient.quantity)) throw Errors.build('BadRequestError', 'This ingredient is not available in your inventory', 403);
    });

    // Deduct used ingredients in all cases
    ingredients.forEach((ingredient) => {
      this.payload.inventory.deduct(ingredient.id, ingredient.quantity);
    });

    // Check if combination of ingredients is right
    const potion = Recipe.craft(ingredients);
    if (!potion) return false;
    this.payload.crafted.push(potion);
    return true;
  }

  format() {
    const inventory = { inventory: this.payload.inventory.format() };
    return _.merge(_.omit(this.payload, ['password']), inventory);
  }
}

module.exports = User;
