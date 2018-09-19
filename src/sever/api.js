import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/abc';

axios.interceptors.request.use((params)=>{
	let path = new RegExp('/app/i');
	if (!path.test(params.url)) {
		if (params.params) {
			params.params.json = true;
		}else {
			params.params = {json:true};
		}
	}

	return params;
});

axios.interceptors.response.use(function ({data}) {
	let o = {};
	if (data.banner){
		o.list = data.data;
		o.banner = data.banner;
		o.origin = '新歌';
	}else if (data.rank){
		o.list = data.rank.list;
		o.total = data.rank.total;
		o.origin = '排行';
	}else if (data.plist){
		o.list = data.plist.list.info;
		o.total = data.plist.list.total;
		o.origin = '歌单';
	}else if (data.info && data.list) {
		o.list = data.list.list;
		o.info = data.info.list;
		o.origin = '歌单详情';
	}else if (data.list){
		o.list = data.list;
		o.origin = '歌手';
	}else if (data.singers) {
		o.list = data.singers.list.info;
		o.origin = '歌手列表';
	}else if (data.info && data.songs && data.info.singerid) {
		o.singerInfo = data.info;
		o.songs = data.songs;
		o.origin = '歌手信息';
	}else if (data.info && data.songs)  {
		o.info = data.info;
		o.songs = data.songs;
		o.origin = '排行列表';
	}else {
		o = data;
	}

	return o;
});

function request(init) {
	let defaults = {
		method: 'get',
		path: '',
		params: {}
	};
	Object.assign(defaults,init);
	return axios[defaults.method](defaults.path,{params:defaults.params}).catch((e) => {
		alert('出错:'+e);
	})
}

export function getNewSong() {
	return request({path: '/'})
}

export function getRank() {
	return request({path: '/rank/list'})
}

export function getSongList() {
	return request({path: '/plist/index'})
}

export function getSinger() {
	return request({path: '/singer/class'})
}

export function getSingerList(params={classid:''}) {
	return request({path: '/singer/list/'+params.classid})
}

export function getSingerInfo(params={singerid:''}) {
	return request({path: '/singer/info/'+params.singerid})
}

export function getSongListInfo(params={specialid:''}) {
	return request({path: '/plist/list/'+params.specialid})
}

export function getRankList(params={rankid:''}) {
	return request({path: '/rank/info/'+params.rankid})
}

export function getSongInfo(option) {
	let defaults = {
		hash:'',
		cmd:'playInfo'
	};
	Object.assign(defaults, option);
	return request({ path: `/app/i/getSongInfo.php`, params: defaults })
}

export function getKrcInfo(option) {
	let defaults = {
		hash: '',
		keyword: '',
		timelength:242000,
		cmd: 100
	};
	Object.assign(defaults, option);
	return request({ path: `/app/i/krc.php`, params: defaults })
}

export default {
	getSinger,
	getSongList,
	getRank,
	getNewSong
}