// 终极奥义之洗牌(打乱原有list)
function random(min,max){ //取min到max之间的随机数，包括min和max
	return Math.floor(Math.random()*(max-min+1)+min)
}

export function changelist(list){
	let _list=list.slice()
	for(var i=0;i<_list.length;i++){
		let j=random(0,i)
		let t=_list[i]
		_list[i]=_list[j]
		_list[j]=t
	}
	return _list
}