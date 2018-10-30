import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name : '',
		email : '',
		address : {
			street : '',
			postCode : '',
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
            customer : {
                name : 'Max',
                address : {
                    city : 'London',
                    postcode : 'N19',
                },
                email : 'test@dusted.com',
            }
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
		let form = (
			<form >
				<Input className={classes.Input} type="text" name="name" placeholder="Name" label="Name" />
				<Input className={classes.Input} type="email" name="email" placeholder="Email" label="Email" />
				<Input className={classes.Input} type="text" name="street" placeholder="Street" label="Street" />
				<Input className={classes.Input} type="text" name="postcode" placeholder="Post Code" label="Post Code" />
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