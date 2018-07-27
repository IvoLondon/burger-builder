import React from 'react';
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'
import Aux from '../../../hoc/Aux.js'

const navItems = (props) => {
	return (
		<Aux>
			<ul className={classes.NavItems}>
				<NavItem link="#" title="Link1" />
				<NavItem link="#" title="Link2" />
				<NavItem link="#" title="Link3" />
			</ul>
			<div onClick={props.mobileToggle} className={classes.MobileToggle}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Aux>
	);
}


export default navItems;