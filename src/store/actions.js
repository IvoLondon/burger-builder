export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';


export const addIngredients = (ingredientName) => {
	return {
		type : ADD_INGREDIENTS,
		payload : {
			ingredientName : ingredientName
		}
	}
};

export const removeIngredients = (ingredientName) => {
	return {
		type : REMOVE_INGREDIENTS,
		payload : {
			ingredientName : ingredientName
		}
	}
}