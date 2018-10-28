import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
	state = {
		name : '',
		email : '',
		address : {
			street : '',
			postCode : '',
		}
	}
	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				<form >
					<input className={classes.Input} type="text" name="name" placeHolder="Name" />
					<input className={classes.Input} type="email" name="email" placeHolder="Email" />
					<input className={classes.Input} type="text" name="street" placeHolder="Street" />
					<input className={classes.Input} type="text" name="postcode" placeHolder="Post Code" />
					<Button btnType="Success">Submit</Button>
				</form>
			</div>
		)
	}
}

export default ContactData;