import React from 'react'
import classes from './NavItem.css'


const navItem = (props) => {
	return (
		<li className={classes.NavItem} >
			<a href={props.link}>
				{ props.title }
			</a>
		</li>
	)
}

export default navItem;