import React,{Component} from 'react';
import {Icon} from 'antd';
import { List } from 'antd-mobile';
import {connect} from 'react-redux';
import {acceptPlayState,changePlayState} from "./acceptredux";

const Item = List.Item;

class MusicList extends Component {
	render(){
		let {changePlayState,changeHash,playMusic} = this.props;
		let {list} = this.props;
		return(
			<List >
				{list && list.map(item=>{
					return(
						<Item
							extra={
								<Icon
									type="download"
									style={{
										fontSize: '.45rem'
									}}
								/>
							}
							key={item.audio_id}
							wrap
							onClick={async()=>{
								changePlayState(true);
								changeHash(item.hash);
								await this.props.getMusic(item);
								await this.props.getKrc(item);
								playMusic();
							}}
						>
							{item.filename}
						</Item>
					);
				})}
			</List>
		)
	}
}

export default connect(acceptPlayState,changePlayState)(MusicList);