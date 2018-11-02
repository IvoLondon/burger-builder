import React from 'react';
import classes from './Input.css';

const Input = (props) => {
	let inputElement = null;

	const inputClasses = [classes.Input];
	console.log(props.shouldValidate)
	if(props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch(props.elementType) {
		case 'input' :
			inputElement = <input onChange={props.change} className={inputClasses.join(' ')} { ...props.elementConfig } value={props.value} />
			break;
		case 'textarea' :
			inputElement = <textarea onChange={props.change} className={inputClasses.join(' ')} { ...props.elementConfig } value={props.value} />
			break;
		case 'select' :
			inputElement =
				<select onChange={props.change}>
					{props.elementConfig.options.map((option) => {
						return (
							<option key={option.value} val={option.value}>
								{option.displayName}
							</option>
						)
					})}
				</select>
			break;
		default :
			inputElement = <input onChange={props.change} className={inputClasses.join(' ')} { ...props.elementConfig } value={props.value} />
	}
	return (
		<div className="">
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input;