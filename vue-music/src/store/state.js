import {playMode} from '@/assets/js/config'


const state = {
	singer:{},
	scrollY:{},
	songlist:{},
	playingb: false,
	fullScreen: false,
	playlist:[],
	sequenceList:[],
	finallsong:[],
	mode:playMode.sequence,
	currentIndex:-1
}
export default state