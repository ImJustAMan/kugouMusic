import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Rank from "./rank";
import RankList from "./ranklist";

class RankPage extends Component {
	render(){
		return(
			<Switch>
				<Route
					exact
					path= '/rank'
					component= {Rank}
				/>
				<Route
					path= '/rank/info/:rankid'
					render= {(props)=>{return <RankList
						playMusic={this.props.playMusic}
						getMusic={this.props.getMusic}
						getKrc={this.props.getKrc}
						{...props}/>}}
				/>
			</Switch>
		)
	}
}

export default RankPage;