import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
	<div className={classes.BuildControl}>
		<label>{props.label}</label>
		{props.disableButton}
		<button onClick={props.removeIngredient} className={classes.Less} disabled={props.disableButton}>Less</button>
		<button onClick={props.addIngredient} className={classes.More}>More</button>
	</div>
)
export default buildControl