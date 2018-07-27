import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'

const toolbar = () => {
	return (
		<div className={classes.Toolbar}>
			<div>
				Menu
			</div>
			<div>
				<Logo />
			</div>
			<div>
				Options
			</div>
		</div>
	)
}

export default toolbar;