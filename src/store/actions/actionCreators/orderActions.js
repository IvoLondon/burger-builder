import * as actionTypes from './../actionTypes';
import axios from './../../../axios-orders';

export const makeOrderSuccess = (orderID, orderData) => {
	return {
		type : actionTypes.MAKE_ORDER_SUCCESS,
		loading : false,
		orderID : orderID,
		orderData : orderData,

	}
}

export const makeOrderFail = () => {
	return {
		type : actionTypes.MAKE_ORDER_FAIL,
		loading : false,
	}
}

export const makeOrderInProgress = () => {
	return {
		type : actionTypes.MAKE_ORDER_IN_PROGRESS,
		loading : true,
	}
}

export const makeOrder = (orderData) => {

	return (dispatch) => {
		dispatch(makeOrderInProgress());
		axios.post('/orders.json', orderData)
        .then((response) => {
            dispatch(makeOrderSuccess(response.data.name, orderData));
        })
        .catch((err) => {
            dispatch(makeOrderFail());
        });
	}
}

