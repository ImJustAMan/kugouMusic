import React, { Component } from 'react';
import {getSongListInfo} from '../../sever/api'
import {List,Accordion} from 'antd-mobile';
import MusicList from "../../component/list";
import {connect} from 'react-redux';
import {acceptSongList,changeSongList} from "../../component/acceptredux";

class SongListInfo extends Component {
	state = {
		data: ''
	};
	isMount = true;
	async componentDidMount(){
		let {specialid} = this.props.match.params;
		await getSongListInfo({specialid}).then(data=>{
			this.isMount && this.setState({
				data
			})
		});
		let {list} = this.state.data;
		this.props.changeSongList(list.info);
	}
	componentWillUnmount(){
		this.isMount = false;
	}
	render(){
		let {list,info} = this.state.data;
		return(
			<div>
				{
					list && (
						<div className='singer-img'>
							<img
								src={info.imgurl.replace('{size}',400)}
								width='100%'
								height='100%'
								alt=''
							/>
							<Accordion>
								<Accordion.Panel
									header={info.intro.slice(0,20)}
								>
									<List>
										<List.Item
											wrap
										>
											{info.intro.slice(20)}
										</List.Item>
									</List>
								</Accordion.Panel>
							</Accordion>
							<MusicList
								list={list.info}
								playMusic={this.props.playMusic}
								getMusic={this.props.getMusic}
								getKrc={this.props.getKrc}
							/>
						</div>
					)
				}
			</div>
		);
	}
}

export default connect(acceptSongList,changeSongList)(SongListInfo);