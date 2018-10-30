import React from 'react';
import classes from './Input.css';

const Input = (props) => {
	let inputElement = null;
	switch(props.elementType) {
		case 'input' :
			inputElement = <input className={classes.Input} { ...props.elementConfig } value={props.value} />
			break;
		case 'textarea' :
			inputElement = <textarea className={classes.Input} { ...props.elementConfig } value={props.value} />
			break;
		case 'select' :
			inputElement =
				<select>
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
			inputElement = <input className={classes.Input} { ...props.elementConfig } value={props.value} />
	}
	return (
		<div className="">
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input;