import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.css';

import Button from './../../components/UI/Button/Button'
import Input from './../../components/UI/Input/Input'
import * as actionCreators from './../../store/actions/index'

import Spinner from './../../components/UI/Spinner/Spinner'

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
                    isEmail : true,
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
                    minLength : 6,
                },
                valid : false,
                touched : false,
            }
        },
        checkFormCompletion : false,
        signUpMethod : true,
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            validationPass = pattern.test(el) && validationPass
        }
 
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            validationPass = pattern.test(el) && validationPass
        }

        return validationPass;

    }
    changeValueHandler = (ev, id) => {
    	const newObj = {
    		...this.state.authForm
    	}
        const newElObj = {
            ...newObj[id]
        }

        newElObj.value = ev.target.value;
        newElObj.valid = this.checkValidityHandler(newElObj.value, newElObj.validation);
        newElObj.touched = true;
        newObj[id] = newElObj;

        let checkFormCompletion = true;
        for(let validity in newObj) {
            checkFormCompletion = newObj[validity].valid && checkFormCompletion
        }
        this.setState({
            authForm : newObj,
            checkFormCompletion : checkFormCompletion,
        })
    }

    submitOrderHandler = (ev) => {
        ev.preventDefault();
        this.props.Auth(this.state.authForm.name.value, this.state.authForm.password.value, this.state.signUpMethod);
        
    }

    authMethodHandler = () => {
        const prevState = {
            ...this.state
        }
        prevState.signUpMethod = !this.state.signUpMethod
        this.setState({
            signUpMethod : prevState.signUpMethod
        })
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
        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = this.props.error;
        }

		return (
			<div className={classes.AuthData}>
				<h4>Enter your logins:</h4>
                {errorMessage}
				{ form }
                <Button clicked={this.authMethodHandler} btnType='Danger'>Switch to { this.state.signUpMethod ? 'SIGNIN' : 'SIGNUP'}</Button>
			</div>
		)
    }

}

const mapStateToProps = (state) => {
    return {
        loading : state.auth.loading,
        error : state.auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Auth : (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);