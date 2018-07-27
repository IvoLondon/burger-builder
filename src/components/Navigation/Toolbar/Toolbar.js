import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'

const toolbar = (props) => {
	return (
		<div className={classes.Toolbar}>
			<div>
				Menu
			</div>
			<div>
				<Logo />
			</div>
			<div>
				<NavItems mobileToggle={props.mobileToggle} />
			</div>
		</div>
	)
}

export default toolbar;