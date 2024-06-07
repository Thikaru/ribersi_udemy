function add(v1:number,v2:number):number{
	return v1+v2
}

function multiply(v1:number, v2:number){
	return v1*v2
}

function calculate(
	v1:number,
	v2:number,
	callback:(a:number,b:number)=>number
){
	return callback(v1,v2)
}

console.log(calculate(3,4,add))
console.log(calculate(3,4,multiply))

function hello(){
	console.log("Hello world!!")
}

const hello2 = ()=>{
	console.log("HELLO WORLD !!")
}
// setTimeout(hello(),2000)はダメ．hello()は結果を表し，関数を表さない．そのため，関数を示すにはhello出ないとだめ
setTimeout(hello,2000)
setTimeout(hello2,2000)
setTimeout(()=>{console.log("HELLO")},2000)