import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import getData from '../../component/getData';
import MusicList from "../../component/list";
import {connect} from 'react-redux';
import {changeSongList} from "../../component/acceptredux";

class NewSong extends Component {
	componentDidMount(){
		let {list} = this.props.data;
		this.props.changeSongList(list);
	}
	render(){
		let {list,banner} = this.props.data;
		return(
			<div>
				<Carousel
					autoplay
					infinite
					autoplayInterval={1500}
				>
					{banner.map(item=>{
							return(
								<div key={item.id}>
									<img
										src={item.imgurl}
										width='100%'
										alt=''
										onLoad={()=>{
											this.setState({
												imgHeight:'auto'
											})
										}}
									/>
								</div>
							);
						})}
				</Carousel>
				<MusicList
					list={list}
					playMusic={this.props.playMusic}
					getMusic={this.props.getMusic}
					getKrc={this.props.getKrc}
				/>
			</div>
		);
	}
}

export default connect(null,changeSongList)(getData('getNewSong',NewSong));