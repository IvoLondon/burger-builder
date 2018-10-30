import React, {Component} from 'react';
import Order from './../../components/Order/Order';

import axios from './../../axios-orders';

class Orders extends Component {
	state = {
		orders : [],
	}
	componentDidMount() {
		axios.get('orders.json')
			.then((res) => {
				const fetchedOrders = [];
				for(let singleOrder in res.data) {
					fetchedOrders.push({
						...res.data[singleOrder],
						id : singleOrder
					});
				}
				this.setState({
					orders : fetchedOrders,
				})
			})
			.catch((err) => {
				console.log(err);
			})
	}
	render() {
		return (
			<div>
				{ this.state.orders.map((order) => {
					console.log(order);
					return <Order key={order.id} ingredients={order.ingredients}  />
				}) }

			</div>
		)
	}
}

export default Orders;