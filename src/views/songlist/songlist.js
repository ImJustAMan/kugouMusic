import React, { Component } from 'react';
import getData from "../../component/getData";
import {List,WhiteSpace} from 'antd-mobile';
import {Icon} from 'antd';
import './songlist.css';
import {connect} from 'react-redux';
import {changePlayState} from "../../component/acceptredux";

const Item = List.Item;
const Brief = Item.Brief;

class SongList extends Component {
	render(){
		let {list} = this.props.data;
		let {changePlayState,history} = this.props;
		return(
			<div>
				<List className='songlist'>
					{list.map(item=>{
						return(
							<div key={item.specialid}>
								<WhiteSpace size='xl' />
								<Item
									thumb={item.imgurl.replace('{size}',400)}
									wrap
									arrow='horizontal'
									onClick={()=>{
										changePlayState(false);
										history.push({
											pathname: 'plist/list/'+item.specialid,
											state: {
												title: item.specialname,
												gradient: true
											}
										})
									}}
								>
									{item.specialname}
									<Brief>
										<Icon
											style={{
												marginRight: '.1rem'
											}}
											type="play-circle-o"
										/>
										{item.playcount}
									</Brief>
								</Item>
							</div>
						)
					})}
				</List>
			</div>
		);
	}
}

export default connect(null,changePlayState)(getData('getSongList',SongList));