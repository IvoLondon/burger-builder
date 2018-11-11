import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner'
import axios from './../../axios-orders';

class Orders extends Component {

	componentWillMount() {
		this.props.getOrders();
	}
	render() {
		let ordersPage = <Spinner />
		if(!this.props.loading) {
			ordersPage = (
				<div>
					{ this.props.orders.map((order) => {
						console.log(order);
						return <Order key={order.id} ingredients={order.ingredients}  />
					}) }

				</div>
			)
		}
		return ordersPage
	}
}

const mapStateToProps = (state) => {
	return {
		orders : state.orders.orders,
		loading : state.orders.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getOrders : () => dispatch(actionCreators.getOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);