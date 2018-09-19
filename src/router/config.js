import NewSong from '../views/newsong/newsong'
import Rank from '../views/rank/rank'
import SongList from '../views/songlist/songlist'
import Singer from '../views/singer/singer'

let navData = [
  {
    title: '新歌',
    path: '/',
    component: NewSong
  },
  {
    title: '排行',
    path: '/rank',
    component: Rank
  },
  {
    title: '歌单',
    path: '/plist',
    component: SongList
  },
  {
    title: '歌手',
    path: '/singer',
    component: Singer
  }
];

export { navData }