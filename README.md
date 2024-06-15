# Udemy リバーシで学ぶ TypeScript

## ASDF でセットアップ

#### [ASDF の公式](https://asdf-vm.com/guide/getting-started.html)

asdf の設定簡易理解

- 「.tool-version」ファイルにダウンロードしたいバージョンの情報を書く
- 「asdf install」を実行するとそのディレクトリで使えるバージョンをインストール

## ts-node を使って実行

- 「ts-node」は Nodejs を使って TypeScript を簡単に実行できるツールのこと
- TypeScript は tsc コマンドで JS に変換してから実行する．
- ts-node を使うと，「npx ts-node hello.ts」で実行できる


```
# コマンドを実行
npx ts-node training/hello.ts
```

### ts-node のセットアップ

- 「npm」は node.js のバージョン管理ツール

- 「npm init」をはじめにする
  - package.json が作成される
- npm install --save-dev typescript@4.8.3 ts-node@10.9.1
  - 上記のコマンド実行すると「package.json」に ts-node と typescript が追加される
- hello.ts を作成する．console.log で文字だけ出力
- 動作するか次のコマンドを入力「npx ts-node hello.js」

### ホットリロードできるようにする

```
npm install --save-dev nodemon@2.0.20
```

- 「nodemon.json」を作成する
```JSON
{
	"wathc": [
		"src"
	],
	"ext": "ts",
	"exec": "ts-node src/main.ts"
}
```

package.jsonの「scripts」の部分に「"start": "nodemon",」を追加する

```json
{
  "name": "ribersi_udemy",
  "version": "1.0.0",
  "description": "## ASDF でセットアップ",
  "main": "index.js",
  "scripts": {
    "start": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.14",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.3"
  },
  "dependencies": {
    "express": "^4.18.1"
  }
}
```

### アクセスログを設定する

下記をインストールする
```json
npm install morgan@1.10.0
npm install --save-dev @types/morgan@1.9.3
```

- 「main.ts」に設定を書き入れる

```
import morgan from 'morgan'

app.use(morgan('dev'))
```

### エラーハンドリング

```
npm install express-async-errors@3.1.1
```

main.tsを下記のように書いてください
```typescript
import express from 'express'
import morgan from 'morgan'
import 'express-async-errors'

const PORT = 3000

const app = express()

// 開発環境で見やすいログを出す
app.use(morgan('dev'))

app.get('/api/hello', async (req, res) => {
	res.json({
		message: 'Hello World'
	})
})

app.get('/api/error', async (req, res) => {
	throw new Error('Error endpoint')
})

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Reversi application started: http://localhost:${PORT}`)
})

function errorHandler(err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
	console.error('Unexpected error occurred', err)
	res.status(500).send({
		message: 'Unexpected error occurred'
	})
}
```

## 静的ファイルの設定を行う

- static/index.html
```typescript
app.use(express.static('static', { extensions: ['html'] }))
```
を記述する

## Dockerの設定

- docker-compose.yamlファイルに設定を記述
```
docker-compose up

// ログの確認
docker-compose logs -f

// プロセスが動いているかどうか
docker-compose ps

// mysqlの確認
docker-compose exec mysql mysql --user=reversi --password=password reversi
```

### コンテナの削除

```
docker-compose down
```

## DDLの作成 (Data Difinition Language)データ定義言語
データ定義言語とは，テーブルや索引，シーケンスなどのデータベースオブジェクトを定義する言語の事．

- mysql/init.sqlのファイルを作成して記入していく

実行コマンド
これで，テーブルが作成される
```
cat mysql/init.sql | docker-compose exec -T mysql mysql --user=root --password=rootpassword
```

## APIの疎通

フロント側のJSと，バックエンド側で動いているExpressのTypsScriptを書く必要がある．

- フロント側のjsでは，リクエスト処理が必要
```
async function registerGame() {
	await fetch('/api/games', {
		method: 'POST'
	})
}

async function main() {
	await registerGame();
	await showBoard();
}
```

- サーバサイド側
```typescript
app.post('/api/games', async (req, res) => {
	const startedAt = new Date();
	console.log(`startedAt = ${startedAt}`);

	res.status(201).end();
})
```


### Mysqlを書き換えるためには，下記のライブラリをインストールする
```
npm install mysql2@2.2.3
```
今回は，私は，データベースのポートを「4406」にしているので，下記のようにする必要があった．portを使って，アクセスするポートを変更する必要があった．
```typescript
const conn = await mysql.createConnection({
		host: 'localhost',
		port: 4406,
		database: 'reversi',
		user: 'reversi',
		password: 'password'
	});
```


## shellにコマンドを登録

- /binフォルダを作成

- connect_mysql.sh
```shell
#!/bin/bash

docker-compose exec mysql mysql --user=reversi --password=password reversi
```

- 上記でファイルに権限を与えて使ってみる
```shell
chmod +x ./bin/connect_mysql.sh

# このコマンドで入れるようになる
./bin/connect_mysql.sh
```

## VSCodeに入れるプラグイン
- Draw.io Integration
- swagger Viewer

## 他の資料

- [TypeScript詳細](documents/typescript_detail.md)
- [三層アーキテクチャ](documents/three-layer-architecture.md)
