import React, { Component } from 'react';
import {getRankList} from '../../sever/api'
import MusicList from "../../component/list";
import './ranklist.css';
import {connect} from 'react-redux';
import {acceptSongList,changeSongList} from "../../component/acceptredux";

class RankList extends Component {
	state = {
		data: ''
	};
	isMount = true;
	async componentDidMount(){
		let {rankid} = this.props.match.params;
		await getRankList({rankid}).then(data=>{
			this.isMount && this.setState({
				data
			})
		});
		let {list} = this.state.data.songs;
		this.props.changeSongList(list);
	}
	componentWillUnmount(){
		this.isMount = false;
	}
	render(){
		let {info,songs} = this.state.data;
		return(
			<div>
				{
					info && (
						<div className='singer-img'>
							<img
								src={info.imgurl.replace('{size}',400)}
								width='100%'
								height='100%'
								alt=''
							/>
							<div className='updateTime'>
								上次更新时间:{new Date(songs.timestamp*1000).toLocaleString()}
							</div>
							<MusicList
								list={songs.list}
								playMusic={this.props.playMusic}
								getMusic={this.props.getMusic}
								getKrc={this.props.getKrc}
							/>
						</div>
					)
				}
			</div>
		)
	}
}

export default connect(acceptSongList,changeSongList)(RankList);