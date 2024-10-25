# Lit-Kansai-Hackathon-2024

## 目次

1. [環境構築](#環境構築)
2. [実行方法](#実行方法)
3. [開発の流れ](#開発の流れ)
4. [Git,GitHub/命名規則](#Git,GitHub/命名規則)

## 環境構築

プロジェクトをローカル環境に置いて動作させるための手順を説明します。  
### 1.リポジトリのクローン
オンライン上にあるプロジェクトを自分のパソコンにコピーする方法です。
GitHubをブラウザで開き、リポジトリへ移動、code -> loval -> ssh -> copyをします。  
その後、ターミナルにおいて以下のコードを、リポジトリをクローンしたい場所で実行します。  
```ターミナル
git clone コピーしたURL
```

### ２.環境構築
下記のnotionに必要なものと簡単にその機能をまとめています。  
[環境構築まとめ](https://www.notion.so/ToDoList-dd780ddfd2ee4948a6c6950eaae9a4e6?pvs=4)

## 実行方法

プロジェクトを実際に動かすための手順を説明します。
- 以下のコマンドを実行します。

```bash
cd リポジトリ名
cd my-app
npm run dev
```

- その後、ターミナル内に表示されたURLをブラウザで開きます。

## 開発の流れ
### 1. issueを立てる
`in GitHub`
- GitHubにおいてissue(to do的なもの)を作成します。

### 2. issueをもとにbranchを作成する

`in GitHub`
- 自分が担当するissueを開き、右の`create a branch`を押します。
- `Create branch`をclickするとcommandが表示されるのでcopyします。

`in VSCode`  
- コピーしたコマンドをVSCodeのターミナルで実行すると、branchの作成と移動が完了します。


### 3. 開発
`in VSCode`
- がんばる

### 4. commit
`in VSCode`
- ローカルの作業内容を保存することです。ゲームでいうセーブ的な。
- キリがいい時にcommitするのがおすすめです。
- 1つのissueに対して、commitは複数回行っても良いです。

### 5. push
`in VSCode`
- ローカルのコミット履歴をリモートリポジトリに送信する操作です。  
（みんなのパソコン上の作業をネット上にあるプロジェクトに反映させます）
- issueの作業が終了し、全ての変更をcommit後、pushを行います。
- 1つのissueに対して、pushは1回行います。

### 6. pull reqestの作成、merge、branchの消去
`in GitHub`
- push後、GitHubを開くと`compare & pull request`を表示されるのでクリックします。
- 指示に従って進んでいき、いい感じにmergeとbranchの消去を行います。

### 7. issueを立てて次の作業へ
`in GitHub`
- 1に戻る 

`in VSCode`
- もしmain branchでアプリを実行したい場合、以下をターミナルで実行します。
```bash
git checkout main
git pull
```

## Git,GitHub/命名規則
### issue

- 【HTML】 `What`を`How`  
  （例）  【HTML】 sectionタグにトップ画像を追加  
- 【CSS】 `What`を`How`  
  （例）  【CSS】 h2.classの色を赤色に変更  

### branch

- issues/`イシュー番号`  
  （例）  issues/3

### commit massage
- #`イシュー番号` `What`を`How`  
  （例）  #3 sectionタグにトップ画像を追加

### pull request
- [`ブランチ名`] `What`を`How`  
  （例）  [issues/3] sectionタグにトップ画像を追加
