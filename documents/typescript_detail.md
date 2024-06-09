# TypeScript 基本

## JS と TypeScript の比較

コード自体は結構似ている．

## 型注釈と型推論

型を決めて変数を宣言できる．型を決めずに数字や文字を入れて初期化すると型を推論してくれる．配列は，配列のみを宣言すると，never 型になる．
変数の場合は any の型になる．any 型はなんでも再代入可能．

## 関数の書き方

```typescript
function 関数名(変数:<型名>,...)<型名>{

}
<>はなくてもあってもいい．型名はnumberやany
```

## クラス・コンストラクタ・getter・メソッド

```typescript
class Fraction {
  // 下記の宣言を省略できる
  // private _numerator:number
  // private _denominator:number
  // constructor(numerator:number,denominator:number){
  // 	this._numerator = numerator
  // 	this._denominator = denominator
  // }

  // 省略記法
  constructor(private _numerator: number, private _denominator: number) {}

  // メソッド
  add(other: Fraction): Fraction {
    const resultNumerator =
      this._numerator * other._denominator +
      this._denominator * other._numerator;
    const resultDenominator = this._denominator * other._denominator;

    return new Fraction(resultNumerator, resultDenominator);
  }

  toString(): string {
    return `${this._numerator}/${this._denominator}`;
  }

  get numerator() {
    return this._numerator;
  }

  get denominator() {
    return this._denominator;
  }
}

const f1 = new Fraction(1, 2);
console.log(f1.numerator);
console.log(f1.denominator);

// // クラス内のメンバ変数にprivateをつけないとアクセスされる．
// // しかし，privateつけると変更できなくなるが，逆に読み込みもできなくなる．
// // よって読める変数を作成するには，getterを作成する必要がある．
// f1.numerator = 3
// console.log(f1.numerator)

const f2 = new Fraction(3, 5);
console.log(f2.toString());

const f3 = f1.add(f2);
console.log(f3.toString());
```

## インタフェース

```typescript
const STONE = 0;
const PAPER = 1;
const SCISSORS = 2;

// HandGeneratorはgenerateメソッドをもつものであると教える
// 曖昧なものの宣言をできる
interface HandGenerator {
  generate(): number;
}

// implementsでinterface宣言したものを指定できる
class RandomHandGenerator implements HandGenerator {
  generate(): number {
    return Math.floor(Math.random() * 3);
  }

  generateArray(): number[] {
    return [];
  }
}

class Janken {
  play(handGenerator: HandGenerator) {
    const computerHand = handGenerator.generate();

    console.log(`computerHand = ${computerHand}`);

    // 勝敗判定などが続く
  }
}

const janken = new Janken();
const generator = new RandomHandGenerator();
janken.play(generator);

class StoneHandGenerator implements HandGenerator {
  generate(): number {
    return STONE;
  }
}

const generator2 = new StoneHandGenerator();
janken.play(generator2);
```

## 3 種類の方法で関数を定義する

- function
- 変数に代入
- アロー関数

```typescript
function add1(v1: number, v2: number): number {
  return v1 + v2;
}

const result1 = add1(1, 2);
console.log(`result1 = ${result1}`);

const add2 = function (v1: number, v2: number): number {
  return v1 + v2;
};

console.log(add2);
const result2 = add2(1, 2);
console.log(`result2 = ${result2}`);

const add3 = (v1: number, v2: number) => {
  return v1 + v2;
};

const result3 = add3(1, 2);
console.log(`result3 = ${result3}`);
```

## 関数のコールバック関数

```typescript
function add(v1: number, v2: number): number {
  return v1 + v2;
}

function multiply(v1: number, v2: number) {
  return v1 * v2;
}

function calculate(
  v1: number,
  v2: number,
  callback: (a: number, b: number) => number
) {
  return callback(v1, v2);
}

console.log(calculate(3, 4, add));
console.log(calculate(3, 4, multiply));

function hello() {
  console.log("Hello world!!");
}

const hello2 = () => {
  console.log("HELLO WORLD !!");
};
// setTimeout(hello(),2000)はダメ．hello()は結果を表し，関数を表さない．そのため，関数を示すにはhello出ないとだめ
setTimeout(hello, 2000);
setTimeout(hello2, 2000);
setTimeout(() => {
  console.log("HELLO");
}, 2000);
```

## 非同期処理

- readFile に渡されているコールバック関数は，書かれている処理の実行とコールバックの実行が並列に行われる．そのため，readFile 内のコールバック関数の処理より，他のコードの処理が実行されても変更されていないことがある．

- promise による非同期処理の書き方
  - 約束をした処理と，その約束した処理の実行後にする処理を設定できる
```typescript
import fs from 'fs'
// Promiseを使うためにインポート
import util from 'util'

// ファイルを読み込む処理をPromiseで書いている
const promisifyReadFile = util.promisify(fs.readFile)

function main() {
	// Promise<buffer>で，約束した処理のこと 今回はファイルを読み込むことを約束している
	const readFilePromise = promisifyReadFile('package.json')

	// thenは約束が果たされたらどんな処理を行うかを記述している
	readFilePromise.then((data) => {
		const fileContent = data.toString()
		console.log(fileContent)
	})
}

main()
```

- async/await
  - awaitの処理をしたい関数の名前のfunctionの前に「async」をつける
  - 非同期で処理を行える
```typescript
import fs from 'fs'
import util from 'util'

const promisifyReadFile = util.promisify(fs.readFile)

async function main() {
	const data = await promisifyReadFile('package.json')
	const fileContent = data.toString()
	console.log(fileContent)
}

main()
```

