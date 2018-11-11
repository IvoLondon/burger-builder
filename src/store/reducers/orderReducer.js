import * as actionTypes from './../actions/actionTypes';

const initialState = {
	loading : false,
	orders : [],
}

const orderReducer = (state = initialState, action) => {
	switch(action.type) {
		case "MAKE_ORDER_SUCCESS" :
			const newOrder = {
				...action.orderData,
				id : action.orderID,
			}

			return {
				...state,
				loading : action.loading,
				orders : state.orders.concat(newOrder),

			}
		case "MAKE_ORDER_FAIL" : 
			return {
				...state,
				loading : action.loading,
			}
		case "MAKE_ORDER_IN_PROGRESS" : 
			return {
				...state,
				loading : action.loading,
			}
		default :
			return state;
	}
}

export default orderReducer;