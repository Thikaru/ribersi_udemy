const STONE = 0
const PAPER = 1
const SCISSORS = 2

// HandGeneratorはgenerateメソッドをもつものであると教える
// 曖昧なものの宣言をできる
interface HandGenerator{
	generate():number
}

// implementsでinterface宣言したものを指定できる
class RandomHandGenerator implements HandGenerator{
	generate():number{
		return Math.floor(Math.random()*3)
	}

	generateArray():number[]{
		return []
	}
}

class Janken{
	play(handGenerator: HandGenerator){
		const computerHand = handGenerator.generate()

		console.log(`computerHand = ${computerHand}`)

		// 勝敗判定などが続く
	}
}

const janken = new Janken()
const generator = new RandomHandGenerator()
janken.play(generator)

class StoneHandGenerator implements HandGenerator{
	generate():number{
		return STONE
	}
}

const generator2 = new StoneHandGenerator()
janken.play(generator2)