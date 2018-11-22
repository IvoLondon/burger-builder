import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import axios from '../../../axios-orders';
import {checkValidityHandler} from './../../../shared/checkValidity'

import * as actionCreators from './../../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm : {
            name : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'text',
            		placeholder : 'Name',
            	},
            	value : '',
                validation : {
                    requiredField : true,
                },
                valid : false,
                touched : false,
            },
            city : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'text',
            		placeholder : 'City',
            	},
            	value : '',
                validation : {
                    
                },
                valid : false,
                touched : false,
            },
            postcode : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'text',
            		placeholder : 'Post Code',
            	},
            	value : '',
                validation : {
                    requiredField : true,
                    minLength : 5,
                    maxLength : 5,
                },
                valid : false,
                touched : false,
            },
            email : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'email',
            		placeholder : 'E-mail',
            	},
            	value : '',
                validation : {
                    requiredField : true,
                },
                valid : false,
                touched : false,
            },
            delivery : {
            	elementType : 'select',
            	elementConfig : {
	            	options : [
	            		{value : 'fastest', displayName : 'Fastest'},
	            		{value : 'cheapest', displayName : 'Cheapest'},
	            	]
            	},
                value : 'fastest',
                validation : {
                    
                },
                valid : true,
                touched : false,
            },
            
		},
		checkFormCompletion : false,
	}
	submitOrderHandler = (event) => {
		event.preventDefault();

        let orderDetails = {};
        for(let formElement in this.state.orderForm) {
            orderDetails[formElement] =  this.state.orderForm[formElement].value

        }

        const order = {
            ingredients : this.props.ingr,
            price : this.props.totalPrice,
            order : orderDetails,
            userId : this.props.userId,
        }
        this.props.makeOrder(order, this.props.token);
        
	}
    changeValueHandler = (ev, id) => {
        const updatedFormOrderForm = {
            ...this.state.orderForm
        }
        const updatedElements = {
            ...updatedFormOrderForm[id]
        }

        updatedElements.value = ev.target.value;
        updatedElements.valid = checkValidityHandler(updatedElements.value, updatedElements.validation);
        updatedElements.touched = true;
        updatedFormOrderForm[id] = updatedElements;

        let checkFormCompletion = true;
        for(let validity in updatedFormOrderForm) {
        	checkFormCompletion = updatedFormOrderForm[validity].valid && checkFormCompletion
        }
        this.setState({
            orderForm : updatedFormOrderForm,
            checkFormCompletion : checkFormCompletion,
        })
    }

	render() {

		let formElements = [];
		for(let key in this.state.orderForm) {
			formElements.push({
				id : key,
				config : this.state.orderForm[key],
			})
		}

		let form = (
			<form onSubmit={this.submitOrderHandler}>
				{formElements.map((el) => {
					return (
						<Input
							key={el.id}
							elementType={el.config.elementType}
							elementConfig={el.config.elementConfig}
							value={el.config.value}
							label={el.id}
                            change={(event) => this.changeValueHandler(event, el.id)}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation}
                            touched = {el.config.touched}
                        />
                            
						)
				})}
				
				<Button disabled={!this.state.checkFormCompletion} btnType="Success">Submit</Button>
			</form>
		)
		if(this.props.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				{ form }
			</div>
		)
	}
}



const mapStateToProps = (state) => {
    return {
        ingr : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.orders.loading,
        token : state.auth.idtoken,
        userId : state.auth.userid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeOrder : (orderData, token) => dispatch(actionCreators.makeOrder(orderData, token)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));