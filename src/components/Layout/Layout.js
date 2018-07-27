import React from 'react';

import classes from './Layout.css';
import Aux from './../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../SideDraw/SideDraw'


const layout = (props) => (
		<Aux>

			<Toolbar mobileToggle={props.mobileToggle} />
			<SideDraw mobileToggle={props.mobileToggle} mobileShow={props.mobileShow} />
			<main className={classes.Content}>
				{props.children}
			</main>
		</Aux>
	)

export default layout;