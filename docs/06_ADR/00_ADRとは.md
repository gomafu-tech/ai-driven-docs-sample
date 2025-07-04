# ADRの導入

ADRとはArchitecture Decision Recordの略称であり重要なアーキテクチャの意志決定を、背景、結果と共に記録したドキュメントです。

## 背景

### ADRがなぜ必要か

> プロジェクトの中で最も追跡が困難なことの1つは、ある決定の背後にある動機である。
> プロジェクトに新しく参加した人は、過去の決定に戸惑い、困惑し、喜び、あるいは激怒するかもしれません。
> このような場合、その理由や結果を理解できないまま、以下のどちらかを選択することになります。
> 
> 1. 決定を盲目的に受け入れる   
> 2. やみくもに変更する

by [DOCUMENTING ARCHITECTURE DECISIONS](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

### ADRをどう書くべきか

> アジャイルな手法は文書化に反対しているわけではなく、価値のない文書に反対しているだけである。 
> チーム自身を支援する文書は価値を持つことができますが、それは最新の状態に保たれている場合に限られます。 
> 大きなドキュメントは決して最新の状態に保たれません。
> 小さく、モジュール化された文書であれば、少なくとも更新される可能性があります。

by [DOCUMENTING ARCHITECTURE DECISIONS](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

## 決定

各プロジェクトで行った設計上の意思決定は小さなドキュメントのADRとして残します

### 採用フォーマット

```
// ファイル名={No}_タイトル.md

# タイトル
## 背景
## 決定
```

読むべき順序を明確にするためファイル名にNoをつけてください  
`###`以下の粒度は自由に決めて問題ありません

以下は基本的には記載しません
- 日付：Githubで管理するのでコミット時刻で管理します
- ステータス：採用中or採用前提のADRのみ管理するのでステータスは書きません
- 影響：多くの場合、背景+決定がそのまま影響を意味し、明確な理由がなければ記載不要です
