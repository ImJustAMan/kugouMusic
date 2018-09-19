import React, { Component } from 'react';
import getData from "../../component/getData";
import {List,WhiteSpace} from 'antd-mobile';
import './rank.css';
import {connect} from 'react-redux';
import {changePlayState} from "../../component/acceptredux";

const Item = List.Item;

class Rank extends Component {
	render(){
		let {list} = this.props.data;
		let {changePlayState,history} = this.props;
		return(
			<div>
				<List className='rank'>
					{list.map(item=>{
						return(
							<div key={item.id}>
								<WhiteSpace size='xl' />
								<Item
									thumb={item.imgurl.replace('{size}',400)}
									arrow='horizontal'
									onClick={()=>{
										changePlayState(false);
										history.push({
											pathname: 'rank/info/'+item.rankid,
											state: {
												title: item.rankname,
												gradient: true
											}
										})
									}}
								>
									{item.rankname}
								</Item>
							</div>
						)
					})}
				</List>
			</div>
		);
	}
}

export default connect(null,changePlayState)(getData('getRank',Rank));