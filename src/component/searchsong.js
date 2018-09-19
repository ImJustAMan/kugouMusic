import React,{Component,Fragment} from 'react';
import MusicList from './list';
import {acceptSongList, changeSongList} from "./acceptredux";
import {connect} from 'react-redux';

class SearchSong extends Component {
	state = {
		data: ''
	};
	last = '';
	requestData = () => {
		if (this.props.keyword !== this.last) {
			window.kgJSONP203229533 = ({data}) => {
				this.setState({data});
				this.last = this.props.keyword
			};
			let s = document.createElement("script");
			s.src = `http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${this.props.keyword}&page=1&pagesize=30&showtype=1&callback=kgJSONP203229533`;
			document.head.appendChild(s);
			s.remove();
		}
	};
	componentDidMount () {
		this.requestData();
	}
	componentDidUpdate () {
		this.requestData();
		let {info} = this.state.data;
		info && this.props.changeSongList(info);
	}
	render () {
		let {info,total} = this.state.data;
		return(
			<Fragment>
				<div
					style={{
						background: '#f91',
						height: '.6rem',
						fontSize: '.3rem',
						lineHeight: '.6rem',
						padding: '0 .2rem'
					}}
				>共有{info && total}条结果</div>
				<MusicList
					list={info}
					playMusic={this.props.playMusic}
					getMusic={this.props.getMusic}
					getKrc={this.props.getKrc}
				/>
			</Fragment>
		)
	}
}

export default connect(acceptSongList,changeSongList)(SearchSong);