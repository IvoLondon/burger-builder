import React, { Component } from 'react';
import {Route} from 'react-router-dom';
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
		return (
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
}

const mapStateToProps = (state) => {
	return {
		ingr : state.ingredients,
		totalPrice : state.totalPrice,
	}
}

export default connect(mapStateToProps)(Checkout);