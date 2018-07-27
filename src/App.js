import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
	constructor() {
		super();
		this.state = {
			sideDrawerOpen : false,
		}

	}
	toggleSideDrawerHandler = () => {
		let getSideDrawerOpen = !this.state.sideDrawerOpen;
		this.setState({
			sideDrawerOpen : getSideDrawerOpen,
		})
	}
	render() {
		return (
		    <div>
		        <Layout mobileToggle={this.toggleSideDrawerHandler} mobileShow={this.state.sideDrawerOpen}>
		            <BurgerBuilder />
		        </Layout>
		    </div>
		);
	}
}

export default App;
