import * as actionTypes from './../actionTypes'
import axios from './../../../axios-orders';

export const addIngredients = (ingredientName) => {
	return {
		type : actionTypes.ADD_INGREDIENTS,
		payload : {
			ingredientName : ingredientName
		}
	}
};

export const removeIngredients = (ingredientName) => {
	return {
		type : actionTypes.REMOVE_INGREDIENTS,
		payload : {
			ingredientName : ingredientName
		}
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients : ingredients
	}
}

export const getIngredients = (dispatch) => {
	return dispatch => {
		axios.get('https://react-my-burger-d406e.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(err => {
                dispatch(errSetIngredients())
            });
	}
}

export const errSetIngredients = () => {
	return {
		type: actionTypes.ERR_SET_INGREDIENTS,
	}
}