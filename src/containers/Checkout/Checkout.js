import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux'

class Checkout extends Component {

	checkoutContinuedHandler = () => {
		this.props.history.push('/checkout/contact-data');
	}
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}
	render() {
		let summary = <Redirect to='/' />
		let purchasedRedirect = <Redirect to='/' /> 
		if(this.props.ingr) {
			this.props.purchased ? purchasedRedirect :
			summary = (
				<div>
					<CheckoutSummary
						ingredients={this.props.ingr} 
						checkoutContinued={this.checkoutContinuedHandler}
						checkoutCancelled={this.checkoutCancelledHandler}
					/>

					<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
				</div>
			)
		}
		return summary
	}
}

const mapStateToProps = (state) => {
	return {
		ingr : state.burgerBuilder.ingredients,
		totalPrice : state.burgerBuilder.totalPrice,
		purchased : state.orders.purchased,
		
	}
}

export default connect(mapStateToProps)(Checkout);