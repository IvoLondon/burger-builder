import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
            	value : ''
            },
            city : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'text',
            		placeholder : 'City',
            	},
            	value : ''
            },
            postcode : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'text',
            		placeholder : 'Post Code',
            	},
            	value : ''
            },
            email : {
            	elementType : 'input',
            	elementConfig : {
            		type : 'email',
            		placeholder : 'E-mail',
            	},
            	value : ''
            },
            delivery : {
            	elementType : 'select',
            	elementConfig : {
	            	options : [
	            		{value : 'fastest', displayName : 'Fastest'},
	            		{value : 'cheapest', displayName : 'Cheapest'},
	            	]
            	}
            },
            
		},
		loading : false,
	}
	submitOrderHandler = (event) => {
		event.preventDefault();
		this.setState({
            loading : true,
        });
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            
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

	render() {

		let formElements = [];
		for(let key in this.state.orderForm) {
			formElements.push({
				id : key,
				config : this.state.orderForm[key],
			})
		}

		let form = (
			<form >
				{formElements.map((el) => {
					return (
						<Input
							key={el.id}
							elementType={el.config.elementType}
							elementConfig={el.config.elementConfig}
							value={el.config.value}
							label={el.id} />
						)
				})}
				
				<Button btnType="Success" clicked={this.submitOrderHandler}>Submit</Button>
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

export default ContactData;