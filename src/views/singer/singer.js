import React, { Component } from 'react';
import getData from "../../component/getData";
import { List,WingBlank,WhiteSpace } from 'antd-mobile';
import './singer.css';
import {connect} from 'react-redux';
import {acceptPlayState,changePlayState} from "../../component/acceptredux";


const Item = List.Item;

class Singer extends Component {
	render(){
		let {history} = this.props;
		let {list} = this.props.data;
		let newArr = [];
		newArr.push([list[0]]);
		let i = 1;
		while (i < list.length) {
			newArr.push(list.slice(i,i+3));
			i += 3;
		}
		let {changePlayState} = this.props;
		return(
			<div>
				{newArr.map((item,index)=>{
					return(
						<div key={index}>
							<WhiteSpace />
							<WingBlank>
								<List className="my-list" >
									{item.map(i=>{
										return(
											<Item
												arrow="horizontal"
												onClick={() => {
													changePlayState(false);
													history.push({
														pathname: '/singer/list/'+i.classid,
														state: {
															title: i.classname,
															gradient: false
														}
													})
												}}
												key={i.classid}
											>
												{i.classname}
											</Item>
										)
									})}
								</List>
							</WingBlank>
							<WhiteSpace />
						</div>
					)
				})}
			</div>
		);
	}
}

export default connect(acceptPlayState,changePlayState)(getData('getSinger',Singer));