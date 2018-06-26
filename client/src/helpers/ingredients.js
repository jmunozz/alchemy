

export const formatIngredients = ingredients => ingredients.map(ingredient => ({ ...ingredient, selectedQuantity: 0 }));

export const incrementFormattedIngredient = (formattedIngredients, ingredientId) => formattedIngredients.map((ingredient) => {
  if (ingredient.id === ingredientId) { console.log('yoyo'); return { ...ingredient, ...{ selectedQuantity: ingredient.selectedQuantity + 1 } }; }
  return { ...ingredient };
});

export const decrementFormattedIngredient = (formattedIngredients, ingredientId) => formattedIngredients.map((ingredient) => {
  if (ingredient.id === ingredientId) { return { ...ingredient, ...{ selectedQuantity: ingredient.selectedQuantity - 1 } }; }
  return { ...ingredient };
});

export const getSelectedFromFormattedIngredients = formattedIngredients => formattedIngredients.filter(si => (si.selectedQuantity > 0));

export const unformatSelectedIngredients = selectedIngredients => selectedIngredients.map(si => ({
  id: si.id,
  quantity: si.selectedQuantity,
}));

export const isInIngredients = (ingredientArray, ingredientId) => ingredientArray.find(i => i.id === ingredientId);
