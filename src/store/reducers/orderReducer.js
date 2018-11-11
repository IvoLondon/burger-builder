import * as actionTypes from './../actions/actionTypes';

const initialState = {
	loading : false,
	orders : [],
	purchased : false,
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
				purchased : action.purchased,

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
		case "INIT_MAKE_ORDER" :
			return {
				...state,
				purchased : action.purchased
			}

		case 'GET_ORDERS_IN_PROGRESS' :
			return {
				...state,
				loading : true
			}
		case 'GET_ORDERS_SUCCESS' :
			return {
				...state,
				loading : false,
				orders : action.orders,
			}
		case 'GET_ORDERS_FAIL' :
			return {
				...state,
				loading : false
			}

		default :
			return state;
	}
}

export default orderReducer;