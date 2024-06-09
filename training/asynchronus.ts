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

	// let fileContent: string = "Not loaded"

	// fs.readFile('package.json', (err, data) => {
	// 	fileContent = data.toString()
	// 	console.log(fileContent)
	// })

	// console.log(fileContent)
}

main()