import React, { Component } from 'react';

import {
  incrementFormattedIngredient,
  isInIngredients,
  getSelectedFromFormattedIngredients,
} from '../../helpers/ingredients';

import './inventory.css';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  addToCraft(ingredient) {
    const { formattedIngredients, setIngredients } = this.props;
    const ingredientId = ingredient.id;
    // Check ingredient qty is valid
    if (ingredient.quantity <= ingredient.selectedQuantity) { return; }
    // Check it does not exceed max number of ingredients
    const selectedIngredients = getSelectedFromFormattedIngredients(formattedIngredients);
    if (selectedIngredients.length === 3
      && !isInIngredients(selectedIngredients, ingredientId)) { return; }
    // Return new ingredients array with incremented quantity;
    const newIngredients = incrementFormattedIngredient(formattedIngredients, ingredientId);
    setIngredients(newIngredients);
  }

  render() {
    const { error } = this.state;
    const { formattedIngredients } = this.props;


    return (
      <div className="inventory-container">
        {error && (
        <div className="inventory-error">
          {error.message}
        </div>
        )}
        {formattedIngredients.map((ingredient) => {
          const realQuantity = ingredient.quantity - ingredient.selectedQuantity;
          return (
            <div
              className="inventory-ingredient"
              onClick={() => this.addToCraft(ingredient)}
            >
              <img src={ingredient.image_url} alt={ingredient.name} />
              <span>
                {realQuantity}
              </span>
              <div className="inventory-ingredient-content">
                {ingredient.name}
              </div>
              <div className="overlay" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Inventory;
