import * as actionTypes from './../actions/actionTypes';

const INITIAL_STATE = {
	ingredients : null,
	totalPrice: 4,
	error : false,
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducers = (state = INITIAL_STATE, actions) => {
	switch(actions.type) {
		case actionTypes.ADD_INGREDIENTS :
			const addIngredients = {...state.ingredients};
			const newAddPrice = state.totalPrice + INGREDIENT_PRICES[actions.payload.ingredientName];
			addIngredients[actions.payload.ingredientName] = state.ingredients[actions.payload.ingredientName] + 1;
			return {
				...state,
				ingredients : addIngredients,
				totalPrice : newAddPrice
			}
		case actionTypes.REMOVE_INGREDIENTS :
			const removeIngredients = {...state.ingredients};
			const newRemovePrice = state.totalPrice - INGREDIENT_PRICES[actions.payload.ingredientName];
			removeIngredients[actions.payload.ingredientName] = state.ingredients[actions.payload.ingredientName] - 1;
			return {
				...state,
				ingredients : removeIngredients,
				totalPrice : newRemovePrice,

			}
		case actionTypes.ERR_SET_INGREDIENTS : 
			return {
				...state,
				error : true
			}
		case actionTypes.SET_INGREDIENTS : 
			return {
				...state,
				ingredients : actions.ingredients
			}
		default : 
			return state;

	}
} 
export default reducers;