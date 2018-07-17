import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger';
import classes from './BurgerBuilder.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'


const INGREDIENTS_PRICE = {
	salad : 0.5,
	bacon : 1,
	cheese : 1,
	meat : 3,
}

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients : {
				salad : 0,
				bacon : 0,
				cheese : 0,
				meat : 0,
			},
			burgerTotal : 4,
			purchasable : false,
			purchasing : false,
		}
	}
	updatePurchaseState = (ingredients) => {
		let sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((sum, el) => {
			return sum + el;
		}, 0);
		this.setState({purchasable : sum > 0 });
	}
	removeIngredientsHandler = (type) => {
		//get ingredient
		const newIgredients = {...this.state.ingredients};
		const new_number = this.state.ingredients[type] - 1;
		newIgredients[type] = new_number;

		//get price
		const itemPrice = {...INGREDIENTS_PRICE};
		const oldPrice = this.state.burgerTotal;
		const newPrice = oldPrice - itemPrice[type];
		this.updatePurchaseState(newIgredients);

		this.setState({
			ingredients : newIgredients,
			burgerTotal : newPrice,
		})
	}
	addIngredientsHandler = (type) => {
		//get ingredient
		const newIgredients = {...this.state.ingredients};
		const new_number = this.state.ingredients[type] + 1;
		newIgredients[type] = new_number;

		//get price
		const itemPrice = {...INGREDIENTS_PRICE};
		const oldPrice = this.state.burgerTotal;
		const newPrice = itemPrice[type] + oldPrice;
		this.updatePurchaseState(newIgredients);

		this.setState({
			ingredients : newIgredients,
			burgerTotal : newPrice,
		})
	}
	readyToOrderHandler = () => {
		console.log('click');
		this.setState({
			purchasing : true,
		})
	}
	render() {
		const disableButton = {
			...this.state.ingredients
		}
		for(let key in disableButton) {
			disableButton[key] = disableButton[key] <= 0;
		}
		return (
			<div>
				<Burger price={this.state.burgerTotal} ingredients={this.state.ingredients} />
				<Modal show={this.state.purchasing}>
					<OrderSummary ingredients={this.state.ingredients} />
				</Modal>
				<BuildControls
					addIngredient={this.addIngredientsHandler}
					removeIngredient={this.removeIngredientsHandler}
					disableButton={disableButton}
					purchasable={this.state.purchasable}
					ordered={this.readyToOrderHandler}
				/>
			</div>
		)
	}
}

export default BurgerBuilder