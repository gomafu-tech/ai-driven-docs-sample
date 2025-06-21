# API一覧

## Webサイト向けAPI

| API名 | メソッド | パス | 概要 |
|-------|----------|------|------|
| 個人会員申請 | POST | /api/web/applications/personal | 個人会員利用申請の提出 |
| 団体会員申請 | POST | /api/web/applications/group | 団体会員利用申請の提出 |
| 新着図書取得 | GET | /api/web/books/new | 新着図書情報の取得 |
| お知らせ取得 | GET | /api/web/news | お知らせ・イベント情報の取得 |

## 利用者向け端末API

| API名 | メソッド | パス | 概要
|-------|----------|------|------|
| 利用者認証 | POST | /api/terminal/auth/login | 会員認証とセッション開始 |
| 蔵書検索 | GET | /api/terminal/books/search | 蔵書の検索 |
| 書籍詳細取得 | GET | /api/terminal/books/{id} | 特定書籍の詳細情報取得 |
| 貸出処理 | POST | /api/terminal/loans | 書籍のセルフ貸出処理 |
| 返却処理 | PUT | /api/terminal/returns | 書籍のセルフ返却処理 |
| 貸出履歴取得 | GET | /api/terminal/loans/history | 利用者の貸出履歴取得 |
| 貸出延長 | PUT | /api/terminal/loans/{id}/extend | 貸出期間の延長 |
| 予約申込 | POST | /api/terminal/reservations | 書籍の予約申込 |
| 予約一覧取得 | GET | /api/terminal/reservations | 利用者の予約一覧取得 |
| 予約詳細取得 | GET | /api/terminal/reservations/{id} | 特定予約の詳細取得 |
| 予約キャンセル | DELETE | /api/terminal/reservations/{id} | 予約のキャンセル |

## スタッフ向けサイトAPI

| API名 | メソッド | パス | 概要 |
|-------|----------|------|------|
| スタッフログイン | POST | /api/staff/auth/login | スタッフ認証とトークン発行 |
| トークン更新 | POST | /api/staff/auth/refresh | アクセストークンの更新 |
| パスワード変更 | PUT | /api/staff/auth/password | スタッフパスワードの変更 |
| 申請一覧取得 | GET | /api/staff/applications | 利用申請の一覧取得（検索・絞込対応） |
| 申請詳細取得 | GET | /api/staff/applications/{id} | 特定申請の詳細情報取得 |
| 申請承認 | PUT | /api/staff/applications/{id}/approve | 利用申請の承認処理 |
| 申請否認 | PUT | /api/staff/applications/{id}/reject | 利用申請の否認処理 |
| 一括承認 | PUT | /api/staff/applications/bulk-approve | 複数申請の一括承認 |
| 会員検索 | GET | /api/staff/members/search | 会員情報の検索 |
| 会員一覧取得 | GET | /api/staff/members | 会員一覧の取得 |
| 会員詳細取得 | GET | /api/staff/members/{id} | 特定会員の詳細情報取得 |
| 会員情報更新 | PUT | /api/staff/members/{id} | 会員情報の更新 |
| 会員カード発行 | POST | /api/staff/members/{id}/card | 会員カードの発行・再発行 |
| 書誌検索 | GET | /api/staff/books/search | 書誌情報の詳細検索 |
| 書誌登録 | POST | /api/staff/books | 新規書誌情報の登録 |
| 書誌編集 | PUT | /api/staff/books/{id} | 書誌情報の編集 |
| 蔵書登録 | POST | /api/staff/copies | 新規蔵書の登録 |
| 蔵書一覧取得 | GET | /api/staff/copies | 蔵書一覧の取得 |
| 蔵書ステータス変更 | PUT | /api/staff/copies/{id}/status | 蔵書の状態変更 |
| 貸出中一覧取得 | GET | /api/staff/loans/active | 現在貸出中の書籍一覧取得 |
| 強制キャンセル | PUT | /api/staff/loans/{id}/cancel | 貸出の強制キャンセル |
| 予約管理一覧 | GET | /api/staff/reservations | 全予約状況の取得 |
| 取置中一覧取得 | GET | /api/staff/reservations/held | 取置中の書籍一覧取得 |
| 予約無効化 | PUT | /api/staff/reservations/{id}/void | 予約の無効化処理 |
| 相互貸渡申込一覧 | GET | /api/staff/interlibrary | 相互貸渡申込一覧取得 |
| 相互貸渡詳細取得 | GET | /api/staff/interlibrary/{id} | 相互貸渡の詳細取得 |
| 相互貸渡入金確認 | PUT | /api/staff/interlibrary/{id}/payment | 入金状況の確認・更新 |
| 相互貸渡郵送登録 | PUT | /api/staff/interlibrary/{id}/shipping | 郵送情報の登録 |
| 弁償請求登録 | POST | /api/staff/compensation | 弁償請求の新規登録 |
| 弁償請求一覧取得 | GET | /api/staff/compensation | 弁償請求一覧取得 |
| 弁償入金確認 | PUT | /api/staff/compensation/{id}/payment | 弁償金の入金確認 |
| スタッフ一覧取得 | GET | /api/staff/admin/staff | スタッフ一覧の取得 |
| スタッフ登録 | POST | /api/staff/admin/staff | 新規スタッフの登録 |
| 休館日設定 | POST | /api/staff/admin/holidays | 休館日の設定 |
| 休館日一覧取得 | GET | /api/staff/admin/holidays | 休館日一覧の取得 |
| システム設定取得 | GET | /api/staff/admin/settings | 各種システム設定の取得 |
| システム設定更新 | PUT | /api/staff/admin/settings | 各種システム設定の更新 |

