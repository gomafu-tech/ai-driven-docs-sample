# Result型によるエラーハンドリング

## 背景

従来の例外によるエラーハンドリングでは、コンパイル時にエラー処理の漏れを検出できず、実行時エラーが発生するリスクがある。

## 決定

### Result型による明示的なエラーハンドリング

- 成功・失敗を型で表現し、例外に依存しない
- kotlin-resultライブラリを使用（`com.michael-bull.kotlin-result`）
- エラーは型として扱い、コンパイル時に処理漏れを防ぐ
- バリデーションエラーの集約にはzipOrAccumulateを使用
- ValidationErrorはBusinessErrorを継承

### エラー型の定義

```kotlin
// バリデーションエラーの定義
class ValidationError(
    override val message: String,
    override val code: String = "VALIDATION_ERROR",
    val details: List<ValidationError>? = null  // 複数エラーの集約用
) : BusinessError(message, code)
```

### 複数フィールドのバリデーション例

```kotlin
fun validateApplication(
    name: String,
    email: String,
    age: Int
): Result<ValidatedApplication, List<ValidationError>> {
    return zipOrAccumulate(
        { validateName(name) },
        { validateEmail(email) },
        { validateAge(age) }
    ) { validName, validEmail, validAge ->
        ValidatedApplication(validName, validEmail, validAge)
    }
}

// 個別のバリデーション
fun validateName(name: String): Result<String, ValidationError> =
    if (name.isNotBlank()) Ok(name)
    else Err(ValidationError("名前は必須です", "NAME_REQUIRED"))
```

### Railway Oriented Programming

- 処理を線路のように連結し、エラーが発生したら別の線路に切り替える
- Result型のmap、flatMap、fold等を活用した関数合成
- エラーハンドリングをパイプライン処理として記述

```kotlin
fun processApplication(input: Input): Result<Output, Error> =
    validateInput(input)
        .flatMap { validInput -> checkEligibility(validInput) }
        .flatMap { eligible -> createApplication(eligible) }
        .flatMap { application -> saveApplication(application) }
```

### メリット

- エラーハンドリングが明示的で、実行時エラーを減らせる
- コンパイル時にエラー処理の漏れを検出可能
- 関数合成による可読性の向上