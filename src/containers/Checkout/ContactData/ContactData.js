import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import axios from '../../../axios-orders';

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
                validation : {
                    
                },
                valid : true,
                touched : false,
            },
            
		},
		loading : false,
		checkFormCompletion : false,
	}
	submitOrderHandler = (event) => {
		event.preventDefault();
		this.setState({
            loading : true,
        });
        let orderDetails = {};

        for(let formElement in this.state.orderForm) {
            orderDetails[formElement] =  this.state.orderForm[formElement].value

        }

        const order = {
            ingredients : this.props.ingr,
            price : this.props.totalPrice,
            order : orderDetails,
        }
        axios.post('/orders.json', order)
        .then((response) => {
            this.setState({
                // purchasing : false,
                loading : false,
            });
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({
                // purchasing : false,
                loading : false,
            });
        });
	}
    checkValidityHandler = (el, rules) => {

        let validationPass = true;
        if(rules.requiredField) {
            validationPass = el.trim() != '' && validationPass;
        }
        
        if(rules.minLength) {
            validationPass = el.length >= rules.minLength && validationPass;
        }

        if(rules.maxLength) {
            validationPass = el.length <= rules.maxLength && validationPass;
        }

        return validationPass;

    }
    changeValueHandler = (ev, id) => {
        const updatedFormOrderForm = {
            ...this.state.orderForm
        }
        const updatedElements = {
            ...updatedFormOrderForm[id]
        }

        updatedElements.value = ev.target.value;
        updatedElements.valid = this.checkValidityHandler(updatedElements.value, updatedElements.validation);
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
		if(this.state.loading) {
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
        ingr : state.ingredients,
        totalPrice : state.totalPrice,
    }
}

export default connect()(ContactData);