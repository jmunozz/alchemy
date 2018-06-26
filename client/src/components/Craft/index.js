import React, { Component } from 'react';

import Http from '../../http/alchemy';
import CraftIngredient from './CraftIngredient';
import {
  decrementFormattedIngredient,
  getSelectedFromFormattedIngredients,
  unformatSelectedIngredients,
} from '../../helpers/ingredients';

import './craft.css';

class Craft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCrafted: null,
    };
  }

  removeFromCraft(ingredient) {
    const { formattedIngredients, setIngredients } = this.props;
    const ingredientId = ingredient.id;
    // Check ingredient qty is valid
    if (!ingredient.selectedQuantity) { return; }
    const newIngredients = decrementFormattedIngredient(formattedIngredients, ingredientId);
    setIngredients(newIngredients);
  }

  craft() {
    const { token, setUser, formattedIngredients } = this.props;
    const alchemyHttpClient = new Http(token);
    const endpoint = '/private/users/craft';
    let ingredients = getSelectedFromFormattedIngredients(formattedIngredients);
    ingredients = unformatSelectedIngredients(ingredients);
    const body = { ingredients };
    alchemyHttpClient.post(endpoint, body)
      .then((result) => {
        const { success, user } = result;
        if (success) {
          const lastCrafted = user.crafted.slice(-1).pop();
          this.state.lastCrafted = lastCrafted;
        }
        if (user) setUser(user);
      });
  }

  render() {
    const { formattedIngredients, user } = this.props;
    const { lastCrafted } = this.state;
    const selectedIngredients = formattedIngredients.filter(si => si.selectedQuantity > 0);

    return (
      <div className="craft-container">
        <div className="craft-ingredient 1">
          {selectedIngredients[0] && (
          <CraftIngredient
            ingredient={selectedIngredients[0]}
            removeFromCraft={this.removeFromCraft.bind(this)}
          />
          )}
        </div>
        <div className="craft-ingredient 2">
          {selectedIngredients[1] && (
          <CraftIngredient
            ingredient={selectedIngredients[1]}
            removeFromCraft={this.removeFromCraft.bind(this)}
          />
          )}
        </div>
        <div className="craft-ingredient 3">
          {selectedIngredients[2] && (
          <CraftIngredient
            ingredient={selectedIngredients[2]}
            removeFromCraft={this.removeFromCraft.bind(this)}
          />
          )}
        </div>
        <div className="craft-cta">
          <button type="submit" onClick={this.craft.bind(this)}>
          Craft!
          </button>
        </div>
        <div className="craft-result">
          { lastCrafted
              && (
              <div>
                  <p>
                    {`Success! You craft ${lastCrafted.name} !` }
                  </p>
                <img src={lastCrafted.image_url} alt="Recipe" />
              </div>
              )

          }
        </div>
      </div>
    );
  }
}

export default Craft;
