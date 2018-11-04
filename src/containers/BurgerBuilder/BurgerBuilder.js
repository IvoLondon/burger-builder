import React, { Component } from 'react';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'



import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasable: false,
        purchasing: false,
        loading : false,
        error : false,
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
        
        const queryParams = [];
        queryParams.push('price='+this.props.totalPrice);
        for(let i in this.props.ingr) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingr[i]));
        }

        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryParams.join('&'),

        });
    }
    
    componentDidMount() {
        // axios.get('https://react-my-burger-d406e.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients : response.data
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error : true
        //         })
        //     });
    }

    

    render () {
        const disabledInfo = {
            ...this.props.ingr
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />
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
        
        if(this.state.loading) {
            orderSummary = <Spinner />
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

const mapDispatchToProps = (state) => {
    return {
        ingr : state.ingredients,
        totalPrice : state.totalPrice,
    }
}

const mapStateToProps = (dispatch) => {
    return {
        addIngredients : (ingr) => dispatch({type : actionTypes.ADD_INGREDIENTS, payload : { ingredientName : ingr }}),
        removeIngredients : (ingr) => dispatch({type : actionTypes.REMOVE_INGREDIENTS, payload : { ingredientName : ingr }}),
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(withErrorHandler(BurgerBuilder, axios));