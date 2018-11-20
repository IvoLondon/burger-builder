import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!props.isAuth
        	?<NavigationItem link="/auth">Authorization</NavigationItem>
        	:<NavigationItem link="/logout">Logout</NavigationItem> 
    	}
        
    </ul>
);

export default navigationItems;