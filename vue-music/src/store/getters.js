export const singer= state=>state.singer
export const scrollY= state=>state.scrollY
export const songlist=state=>state.songlist
export const playingb=state=>state.playingb
export const fullScreen=state=>state.fullScreen
export const playlist=state=>state.playlist
export const sequenceList=state=>state.sequenceList
export const finallsong=state=>state.finallsong
export const mode=state=>state.mode
export const currentIndex=state=>state.currentIndex
export const currentSong=(state) => {
	return state.playlist[state.currentIndex] || {}
}