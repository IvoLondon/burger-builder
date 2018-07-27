import React from 'react';
import classes from './SideDraw.css'
import Modal from '../UI/Modal/Modal'

const sideDraw = (props) => {
	return (
		<Modal show={props.mobileShow} cancel={props.mobileToggle}> 
			<div className={ props.mobileShow ? [classes.SideDraw, classes.Open].join(' ') : classes.SideDraw }> 
				Primerno
			</div>
		</Modal>
	)
}

export default sideDraw;