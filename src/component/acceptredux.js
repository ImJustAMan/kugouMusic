function acceptPlayState(state) {
	return {
		playState: state.playState,
		hash: state.hash
	}
}

function acceptPlayStateAndList(state) {
	return {
		playState: state.playState,
		hash: state.hash,
		list: state.list
	}
}

function acceptSongList(state) {
	return {
		list: state.list
	}
}

function changePlayState(dispatch) {
	return {
		changePlayState (playState) {
			dispatch({type: 'changePlayState',playState})
		},
		changeHash (hash) {
			dispatch({type: 'changeHash',hash})
		}
	}
}

function changeSongList(dispatch) {
	return {
		changeSongList (list) {
			dispatch({type: 'changeSongList',list})
		}
	}
}

export {
	acceptPlayStateAndList,
	acceptPlayState,
	acceptSongList,
	changePlayState,
	changeSongList
}