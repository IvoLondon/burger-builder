import React from 'react';
import classes from './Order.css';

const order = (props) => {
	const ingredients = [];
	for(let ingredient in props.ingredients) {
		ingredients.push({
			name : ingredient,
			amount : props.ingredients[ingredient],
		})
	}
	return (
		<div className={classes.Order}>
			<p>Ingredients:
				{ ingredients.map((ingr) => {
					return (
						<span key={ingr.name} style={{display:'inline-block', textTransform : 'capitalize', 'border' : '1px solid #e7e7e7', padding : '5px', boxShadow : '2px 2px 2px #ccc', margin : '0 3px', }}>
							{ ingr.name }- <strong> { ingr.amount } </strong>
						</span>
					)
				})}
			</p>
		</div>
	)
}

export default order;
