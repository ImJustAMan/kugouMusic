import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import SingerList from "./singerlist";
import Singer from './singer'
import SingerInfo from "./singerinfo";

class SingerPage extends Component {
	render(){
		return(
			<Switch>
				<Route
					exact
					path= '/singer'
					component= {Singer}
				/>
				<Route
					path= '/singer/list/:classid'
					component= {SingerList}
				/>
				<Route
					path= '/singer/info/:singerid'
					render= {(props)=><SingerInfo
						playMusic={this.props.playMusic}
						getMusic={this.props.getMusic}
						getKrc={this.props.getKrc}
						{...props}
					/>}
				/>
			</Switch>
		)
	}
}

export default SingerPage;