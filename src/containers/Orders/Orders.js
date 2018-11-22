import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

class Orders extends Component {

	componentWillMount() {
		this.props.getOrders(this.props.token, this.props.userId);
	}
	render() {
		let ordersPage = <Spinner />
		if(!this.props.loading) {
			ordersPage = (
				<div>
					{ this.props.orders.map((order) => {
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
		token : state.auth.idtoken,
		userId : state.auth.userid,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getOrders : (token, userId) => dispatch(actionCreators.getOrders(token, userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));