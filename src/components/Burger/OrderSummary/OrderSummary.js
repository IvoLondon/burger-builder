import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
	const orderSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span>{igKey}</span> - {props.ingredients[igKey]}
			</li>
		)
	});
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Your delicious burger contains the following ingredients:</p>
			<ul>
				{orderSummary}
			</ul>
			<p>Continue to checkout?</p>
		</Aux>
	);
};

export default orderSummary