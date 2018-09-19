function reducer(state={},action){
  switch (action.type) {
    case 'changePlayState':
      return {
        ...state,
        playState: action.playState
      };
    case 'changeSongList':
      return {
          ...state,
          list: action.list
      };
    case 'changeHash':
      return {
          ...state,
          hash: action.hash
      };
    default:
      return state;
  }
}

export default reducer;