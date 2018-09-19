import React, { Component } from 'react';
import {getSingerInfo} from '../../sever/api'
import { Accordion, List } from 'antd-mobile';
import MusicList from "../../component/list";
import './singerinfo.css';
import {connect} from 'react-redux';
import {acceptSongList,changeSongList} from "../../component/acceptredux";

class SingerInfo extends Component {
	state = {
		data: ''
	};
	isMount = true;
	async componentDidMount(){
		let {singerid} = this.props.match.params;
		await getSingerInfo({singerid}).then(data=>{
			this.isMount && this.setState({
				data
			})
		});
		let {list} = this.state.data.songs;
		await this.props.changeSongList(list);
	}
	componentWillUnmount(){
		this.isMount = false;
	}
	render(){
		let {singerInfo,songs} = this.state.data;
		return(
			<div>
				{
					singerInfo && songs && (
						<div className='singer-img'>
							<img
								src={singerInfo.imgurl.replace('{size}',400)}
								width='100%'
								height='100%'
								alt=''
							/>
							<Accordion>
								<Accordion.Panel
									header={singerInfo.profile.slice(0,20)}
								>
									<List>
										<List.Item
											wrap
										>
											{singerInfo.profile.slice(20)}
										</List.Item>
									</List>
								</Accordion.Panel>
							</Accordion>
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

export default connect(acceptSongList,changeSongList)(SingerInfo);