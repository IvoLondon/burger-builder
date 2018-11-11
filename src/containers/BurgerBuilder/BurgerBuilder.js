import React, { Component } from 'react';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index'



import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }


    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.initMakeOrder();
        this.props.history.push({
            pathname : '/checkout',
        });
    }
    
    componentDidMount() {
        this.props.getIngredients();
    }

    

    render () {
        const disabledInfo = {
            ...this.props.ingr
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />
        if(this.props.ingr) {
            burger = <Aux>
                        <Burger ingredients={this.props.ingr} />
                        <BuildControls
                            ingredientAdded={this.props.addIngredients}
                            ingredientRemoved={this.props.removeIngredients}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ingr)}
                            ordered={this.purchaseHandler}
                            price={this.props.totalPrice} />
                    </Aux>
            orderSummary = <OrderSummary 
                        ingredients={this.props.ingr}
                        price={this.props.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingr : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredients : (ingr) => dispatch(actionCreators.addIngredients(ingr)),
        removeIngredients : (ingr) => dispatch(actionCreators.removeIngredients(ingr)),
        getIngredients : (ingr) => dispatch(actionCreators.getIngredients()),
        initMakeOrder : () => dispatch(actionCreators.initMakeOrder()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));