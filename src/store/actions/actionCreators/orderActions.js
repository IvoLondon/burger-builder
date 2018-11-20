import * as actionTypes from './../actionTypes';
import axios from './../../../axios-orders';

export const makeOrderSuccess = (orderID, orderData) => {
	return {
		type : actionTypes.MAKE_ORDER_SUCCESS,
		loading : false,
		orderID : orderID,
		orderData : orderData,
		purchased : true,

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

export const makeOrder = (orderData, token) => {
	return (dispatch) => {
		dispatch(makeOrderInProgress());
		axios.post('/orders.json?auth=' + token, orderData)
        .then((response) => {
            dispatch(makeOrderSuccess(response.data.name, orderData));
        })
        .catch((err) => {
            dispatch(makeOrderFail());
        });
	}
}

export const initMakeOrder = () => {
	return {
		type : actionTypes.INIT_MAKE_ORDER,
		purchased : false,
	}
}





export const getOrdersSuccess = (orderData) => {
	return {
		type : actionTypes.GET_ORDERS_SUCCESS,
		loading : false,
		orders : orderData,
	}
}

export const getOrdersFail = () => {
	return {
		type : actionTypes.GET_ORDERS_FAIL,
	}
}

export const getOrdersInProgress = () => {
	return {
		type : actionTypes.GET_ORDERS_IN_PROGRESS,
	}
}
export const getOrders = (token) => {
	return (dispatch) => {
		dispatch(getOrdersInProgress());
		console.log(token)
		axios.get('orders.json?auth=' + token)
		.then((res) => {
			const fetchedOrders = [];
			for(let singleOrder in res.data) {
				fetchedOrders.push({
					...res.data[singleOrder],
					id : singleOrder
				});
			}
			dispatch(getOrdersSuccess(fetchedOrders));
		})
		.catch((err) => {
			dispatch(getOrdersFail(err));
		})
	}
}