import React from 'react';

const CraftIngredient = ({ ingredient, removeFromCraft }) => (
  <div onClick={() => removeFromCraft(ingredient)}>
    <div>
      {ingredient.name}
    </div>
    <img src={ingredient.image_url} />
    <div>
      {ingredient.selectedQuantity}
    </div>
  </div>
);

export default CraftIngredient;
