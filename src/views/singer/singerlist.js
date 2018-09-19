import React, { Component } from 'react';
import {getSingerList} from '../../sever/api';
import {List,WhiteSpace} from 'antd-mobile';
import './singerlist.css';
import {connect} from 'react-redux';
import {acceptPlayState,changePlayState} from "../../component/acceptredux";

const Item = List.Item;

class SingerList extends Component {
	state = {
		data: ''
	};
	isMount = true;
	async componentDidMount(){
		let {classid} = this.props.match.params;
		await getSingerList({classid}).then(data=>{
			this.isMount && this.setState({
				data
			})
		})
	}
	componentWillUnmount(){
		this.isMount = false;
	}
	render(){
		let {list=[]} = this.state.data;
		let {changePlayState,history} = this.props;
		return(
			<div>
				<List>
					{
						list.length!==0 && list.map(item=>{
							return(
								<div
									key={item.singerid}>
									<WhiteSpace />
									<Item
										thumb={item.imgurl.replace('{size}','400')}
										className='list-item'
										arrow='horizontal'
										onClick={() => {
											changePlayState(false);
											history.push({
												pathname: '/singer/info/'+item.singerid,
												state: {
													title: item.singername,
													gradient: true
												}
											})
										}}
									>
										{item.singername}
									</Item>
								</div>
							)
						})
					}
				</List>
			</div>
		)
	}
}

export default connect(acceptPlayState,changePlayState)(SingerList);