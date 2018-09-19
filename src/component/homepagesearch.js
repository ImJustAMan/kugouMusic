import {Route,Switch} from 'react-router-dom';
import React,{Component,Fragment} from 'react';
import Nav from "./Nav";
import Search from "./search";

class HomePageSearch extends Component {
	render(){
		return(
			<Fragment>
				<Switch>
					<Route path='/search/index' component={Search}>
					</Route>
					<Route render={()=>{
						return(
							<Nav />
						)
					}}>
					</Route>
				</Switch>
			</Fragment>
		)
	}
}

export default HomePageSearch;