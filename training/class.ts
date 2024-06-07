class Fraction{
	// 下記の宣言を省略できる
	// private _numerator:number
	// private _denominator:number
	// constructor(numerator:number,denominator:number){
	// 	this._numerator = numerator
	// 	this._denominator = denominator
	// }

	// 省略記法
	constructor(private _numerator:number, private _denominator:number){}

	// メソッド
	add(other:Fraction):Fraction{
		const resultNumerator = this._numerator * other._denominator + this._denominator * other._numerator
		const resultDenominator = this._denominator * other._denominator

		return new Fraction(resultNumerator, resultDenominator)
	}

	toString():string{
		return `${this._numerator}/${this._denominator}`
	}

	get numerator(){
		return this._numerator
	}

	get denominator(){
		return this._denominator
	}
}

const f1 = new Fraction(1,2)
console.log(f1.numerator)
console.log(f1.denominator)

// // クラス内のメンバ変数にprivateをつけないとアクセスされる．
// // しかし，privateつけると変更できなくなるが，逆に読み込みもできなくなる．
// // よって読める変数を作成するには，getterを作成する必要がある．
// f1.numerator = 3
// console.log(f1.numerator)

const f2 = new Fraction(3,5)
console.log(f2.toString())

const f3 = f1.add(f2)
console.log(f3.toString())