import React, { Component,createRef,Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Tabs,NavBar,List,Slider } from 'antd-mobile';
import {Icon} from 'antd';
import NewSong from "../views/newsong/newsong";
import SongListPage from "../views/songlist/basicsonglist";
import RankPage from "../views/rank/basicrank";
import {navData} from "../router/config";
import {withRouter} from 'react-router-dom';
import SingerPage from "../views/singer/basicsinger";
import './nav.css';
import {acceptPlayStateAndList,changePlayState} from "./acceptredux";
import {connect} from 'react-redux';
import {getSongInfo,getKrcInfo} from "../sever/api";
import {sToM,parseLyric} from '../utils/utils';
const Item = List.Item;

class Nav extends Component {
	audio = createRef();
	button = createRef();
	popup = createRef();
	state = {
		isPlay: false,
		singerInfo: '',
		duration: 0,
		currentTime:0,
		timeControl: true,
		changeValue: 0,
		songKrc: ''
	};
	hash = this.props.hash;
	playIndex = this.props.list.findIndex(item=>item.hash===(this.hash));
	playMusic = () => {
		this.setState({
			isPlay:true
		})
	};
	next = async () => {
		let {list} = this.props;
		this.playIndex++;
		if (this.playIndex >= list.length) {
			this.playIndex = 0;
		}
		this.hash = list[this.playIndex].hash;
		await this.getMusic(list[this.playIndex]);
	};
	prev = async () => {
		let {list} = this.props;
		this.playIndex--;
		if (this.playIndex < 0) {
			this.playIndex = list.length - 1;
		}
		this.hash = list[this.playIndex].hash;
		await this.getMusic(list[this.playIndex]);
	};
	getMusic = async (item) => {
		this.hash = item.hash;
		this.playIndex = this.props.list.findIndex(i=>i.hash===(this.hash));
		await getSongInfo({hash:item.hash}).then((res)=>{
			this.setState({
				singerInfo: res,
				isPlay: true
			})
		});
	};
	getKrc = async (item) => {
		await getKrcInfo({
			hash:item.hash,keyword: item.filename
		}).then((res)=>{
			this.setState({songKrc: parseLyric(res)})
		})
	};
	highLightKrc = () => {
		if (this.state.songKrc) {
			return (this.state.songKrc.findIndex(item=>item[0] >= this.state.currentTime))
		}
	};
	componentDidMount(){
		let audio = this.audio.current;
		audio.addEventListener('loadedmetadata', () => {
			this.setState({
				duration: audio.duration
			})
		});
		audio.addEventListener('timeupdate',() => {
			this.setState({
				currentTime: audio.currentTime
			})
		});
		audio.addEventListener('ended', () => {
			this.next();
		});
	}
	render(){
		/*console.log(this.state.songKrc)*/
		let basicPath = !navData.some(item=>item.path===this.props.location.pathname);
		let index = navData.findIndex(item =>{
			if (item.path === '/') {
				return false;
			}
			let pathName = new RegExp(item.path);
			let locationPath = this.props.location.pathname;
			return pathName.test(locationPath);
		});
		if (index === -1) index = 0;

		let {location} = this.props;
		let cls = location.state && location.state.gradient?'gradientnav':'normal';
		let {playState,changePlayState} = this.props;
		let audio = this.audio.current;
		return(
			(<div>
				<header>
					<div className='fl'>
						<Icon
							type="play-circle"
						/>
						<span>
						MyMusic
					</span>
					</div>
					<div className='fr'>
						<Icon
							type="search"
							style={{fontSize:'.5rem'}}
							onClick={()=>{
								this.props.history.push('/search/index');
								if (audio) {
									audio.pause();
								}
								changePlayState(false);
							}}
						/>
					</div>
				</header>
				{basicPath &&
				(<NavBar
					className={cls}
					icon={<Icon type="left" />}
					onLeftClick={() => {
						if (audio) {
							audio.pause();
						}
						changePlayState(false);
						this.props.history.go(-1)
					}}
				>
					{location.state && location.state.title}
				</NavBar>)}
				<Tabs
					tabs={navData}
					swipeable={false}
					useOnPan={false}
					initialPage={index}
					renderTabBar={
						basicPath?
						()=>{}:
						props=><Tabs.DefaultTabBar
							{...props}
							page={4}
						/>
					}
					tabBarUnderlineStyle={
						{
							borderColor:'#f60',
							height: '.1rem',
							background: '#f60'
						}
					}
					tabBarActiveTextColor = '#f60'
					onTabClick={(item)=>{
						this.props.history.push(item.path);
						if (audio) {
							audio.pause();
							changePlayState(false);
						}
					}}
				>
					<NewSong {...this.props} playMusic={this.playMusic} getMusic={this.getMusic} getKrc={this.getKrc}/>
					<RankPage {...this.props} playMusic={this.playMusic} getMusic={this.getMusic} getKrc={this.getKrc}/>
					<SongListPage {...this.props} playMusic={this.playMusic} getMusic={this.getMusic} getKrc={this.getKrc}/>
					<SingerPage {...this.props} playMusic={this.playMusic} getMusic={this.getMusic} getKrc={this.getKrc}/>
				</Tabs>
				<div className={playState?'fenge':''}>
				</div>
				<audio
					autoPlay
					src={this.state.singerInfo.url}
					ref={this.audio}
				>
				</audio>
				<div className={playState?'playBox':'hidden'}>
					<Item
						style={{
							background: 'transparent'
						}}
						thumb={
							this.state.singerInfo?<img
								src={this.state.singerInfo.imgUrl.replace('{size}','400')}
								style={{width:'1.3rem',height:'1.3rem',verticalAlign:'middle'}}
								alt=''
								onClick={()=>{
									this.popup.current.style.display = 'block';
								}}
							/>:''
						}
						extra={
							<Fragment>
								<Icon
									type="fast-backward"
									theme="outlined"
									style={{color:'#fff',fontSize:'.5rem',verticalAlign:'middle',marginRight:'0.2rem'}}
									onClick={()=>{this.prev()}}
								/>
								<Icon
									type="caret-right"
									theme="outlined"
									style={{color:'#fff',fontSize:'.5rem',display:this.state.isPlay?'none':'inline-block',verticalAlign:'middle',marginRight:'0.2rem'}}
									onClick={()=>{
										this.setState({isPlay:true});
										audio.play();
									}}
								/>
								<Icon
									type="pause"
									theme="outlined"
									style={{color:'#fff',fontSize:'.5rem',fontWeight:'bold',display:this.state.isPlay?'inline-block':'none',verticalAlign:'middle',marginRight:'0.2rem'}}
									onClick={()=>{
										this.setState({isPlay:false});
										audio.pause();
									}}
								/>
								<Icon
									type="fast-forward"
									theme="outlined"
									style={{color:'#fff',fontSize:'.5rem',verticalAlign:'middle'}}
									onClick={()=>{
										this.next()
									}}
								/>
							</Fragment>
						}
					>
						<span style={{
								display: 'flex',
								flexDirection: 'column'
						}}>
							<span style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '3.5rem',
								fontSize: '.4rem',
								color: '#fff'
							}}>
								{
									this.state.singerInfo && this.state.singerInfo.fileName.substr(this.state.singerInfo.choricSinger.length + 3)
								}
							</span>
							<span style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '3.5rem',
								fontSize: '.28rem',
								color: '#eee'
							}}>
								{
									this.state.singerInfo.choricSinger
								}
							</span>
						</span>
					</Item>
				</div>
				{
					ReactDOM.createPortal(
					<div
						className='popup'
						ref={this.popup}
					>
						<div style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: 1,
							background: 'rgba(255,102,0,.6)'
						}}>
							<NavBar
								className='gradient'
								icon={<Icon type="left" />}
								onLeftClick={()=>{
									this.popup.current.style.display = 'none';
								}}
							>
								{this.state.singerInfo && this.state.singerInfo.songName}
							</NavBar>
							{this.state.singerInfo?<img
								src={this.state.singerInfo.imgUrl.replace('{size}','400')}
							style={{width:'4rem',height:'4rem',verticalAlign:'middle',marginTop:'2rem'}}
							alt=''
						/>:''}
						<div className='songKrc'>
							{this.state.songKrc &&
							this.state.songKrc.map((item,index)=>{
								return (<p
									key={item[0]+item[1]}
									style={{
										fontSize: '.35rem'
									}}
									className={this.highLightKrc() === index?'high-light':''}
								>{item[1]}</p>)
							})
							}
						</div>
							<Slider
								style={{
									marginLeft: '1.3rem',
									marginRight: '1.3rem',
									marginTop: '.5rem'
								}}
								handleStyle={{
									background: '#f60',
									borderColor: '#f60',
									width: '.3rem',
									height: '.3rem',
									marginTop: '-.12rem',
									marginLeft: '-.15rem'
								}}
								trackStyle={{
									background: '#f60',
									height: '.07rem'
								}}
								railStyle={{
									background: '#333',
									height: '.07rem'
								}}
								value={
									this.state.timeControl?!isNaN((this.state.currentTime)/(this.state.duration))?((this.state.currentTime)/(this.state.duration))*100:0:this.state.changeValue
								}
								onChange={(val)=>{
									this.setState({
										timeControl: false,
										changeValue: val
									})
								}}
								onAfterChange={(val)=>{
									audio.currentTime = ((val/100)*this.state.duration);
									this.setState({
										timeControl: true,
										isPlay: true
									});
									audio.play();
								}}
							/>
							<div style={{
								position: 'absolute',
								left: '.1rem',
								marginTop: '-.2rem'
							}}>{sToM(this.state.currentTime)}</div>
							<div style={{
								position: 'absolute',
								right: '.1rem',
								marginTop: '-.21rem'
							}}>{sToM(this.state.duration)}</div>
							<div className='control'>
								<Icon
									type="fast-backward"
									theme="outlined"
									style={{color:'#fff',fontSize:'1rem',verticalAlign:'middle',marginRight:'0.4rem'}}
									onClick={()=>{
										this.prev();
									}}
								/>
								<Icon
									type="caret-right"
									theme="outlined"
									style={{color:'#fff',fontSize:'1rem',display:this.state.isPlay?'none':'inline-block',verticalAlign:'middle',marginRight:'0.4rem'}}
									onClick={()=>{
										this.setState({isPlay:true});
										audio.play();
									}}
								/>
								<Icon
									type="pause"
									theme="outlined"
									style={{color:'#fff',fontSize:'1rem',fontWeight:'bold',display:this.state.isPlay?'inline-block':'none',verticalAlign:'middle',marginRight:'0.4rem'}}
									onClick={()=>{
										this.setState({isPlay:false});
										audio.pause();
									}}
								/>
								<Icon
									type="fast-forward"
									theme="outlined"
									style={{color:'#fff',fontSize:'1rem',verticalAlign:'middle'}}
									onClick={()=>{
										this.next();
									}}
								/>
							</div>
						</div>
						{this.state.singerInfo && <div style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							filter: 'blur(6px)',
							background: `url(${this.state.singerInfo.imgUrl.replace('{size}','400')}) center center/auto 100% no-repeat`
						}}>
						</div>}
					</div>
					, document.body)
				}
			</div>)
		);
	}
}

export default withRouter(connect(acceptPlayStateAndList,changePlayState)(Nav));