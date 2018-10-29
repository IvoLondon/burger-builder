import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients : null,
		totalPrice : 0,
	}
	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for(let param of query.entries()) {
			if(param[0] == 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
			
		}
		this.setState({
			price : price,
			ingredients : ingredients,
		})
	}
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
					ingredients={this.state.ingredients} 
					checkoutContinued={this.checkoutContinuedHandler}
					checkoutCancelled={this.checkoutCancelledHandler}
				/>

				<Route path={this.props.match.path + '/contact-data'} render={(props) => ( <ContactData ingredients={this.state.ingredients} {...props} />)} />
			</div>
		)
	}
}

export default Checkout;