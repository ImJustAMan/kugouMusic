import React,{Component} from 'react';
import { List } from 'antd-mobile';
const Item = List.Item;

class Hot extends Component {
	state = {
		data: ''
	};
	requestData = () => {
		window.kgJSONP894777414 = ({data}) => {
			this.setState({data});
		};
		let s = document.createElement("script");
		s.src = "http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30&callback=kgJSONP894777414";
		document.head.appendChild(s);
		s.remove();
	};
	componentDidMount () {
		this.requestData();
	}
	render () {
		let {info} = this.state.data;
		return(
			<List
				className='hot'
				renderHeader={()=>(
					<div
						style={{
							color: 'blue',
							fontSize: '.3rem'
						}}
					>热门歌曲</div>
				)}
			>
				{info && info.map(item=>{
					return(
						<Item
							key={item.sort}
							onClick={()=>{
								this.props.hotSearch(item.keyword)
							}}
						>
							{item.keyword}
						</Item>
					)
				})}
			</List>
		)
	}
}

export default Hot;