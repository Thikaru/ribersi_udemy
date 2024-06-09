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

## VSCodeに入れるプラグイン
- Draw.io Integration