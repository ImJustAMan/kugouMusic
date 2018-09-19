import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import SongList from "./songlist";
import SongListInfo from "./songlistinfo";

class SongListPage extends Component {
	render(){
		return(
			<Switch>
				<Route
					exact
					path= '/plist'
					component= {SongList}
				/>
				<Route
					path= '/plist/list/:specialid'
					render= {(props)=><SongListInfo
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

export default SongListPage;