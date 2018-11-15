import React, { Component } from 'react';
import classes from './Auth.css';

import Button from './../../components/UI/Button/Button'
import Input from './../../components/UI/Input/Input'


class Auth extends Component {
	state = {
		authForm : {
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
            password : {
            	elementType : 'password',
            	elementConfig : {
            		type : 'password',
            		placeholder : 'Password',
            	},
            	value : '',
            	validation : {
                    requiredField : true,
                },
                valid : false,
                touched : false,
            }
        },
        checkFormCompletion : false,
    }
    changeValueHandler = (ev, id) => {
    	const newObj = {
    		...this.state.authForm[id]
    	}
    	console.log(ev)
	

    	this.setState({
    		    	})
    }

    submitOrderHandler = () => {

    }

    render() {
    	let formElements = [];
		for(let key in this.state.authForm) {
			formElements.push({
				id : key,
				config : this.state.authForm[key],
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

		return (
			<div className={classes.AuthData}>
				<h4>Enter your logins:</h4>
				{ form }
			</div>
		)
    }

}

export default Auth;