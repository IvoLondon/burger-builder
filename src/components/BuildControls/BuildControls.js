import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {

	const controls = [
		{ label : 'Salad', type : 'salad' },
		{ label : 'Bacon', type : 'bacon' },
		{ label : 'Cheese', type : 'cheese' },
		{ label : 'Meat', type : 'meat' },
	]

	return (
		<div className={classes.BuildControls}>
			{ controls.map((el) => (		
				<BuildControl
					key={el.label}
					label={el.label}
					type={el.type}
					addIngredient={() => props.addIngredient(el.type)}
					removeIngredient={() => props.removeIngredient(el.type)}
					disableButton={props.disableButton[el.type]}
				/>		
			)) }

			
			<button 
				className={classes.OrderButton}
				disabled={!props.purchasable}
			>
					Order now
			</button>
		</div>
	)
};

export default buildControls;