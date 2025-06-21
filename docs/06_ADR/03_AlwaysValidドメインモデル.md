# Always Valid ドメインモデル

## 背景

ドメインオブジェクトが不正な状態を持つことで、バグや予期せぬ動作を引き起こすリスクがある。データの整合性を保証するため、常に有効な状態のドメインモデルを採用する。

## 決定

### Always Valid Domain Modelの採用

- ドメインオブジェクトは常に有効な状態を保つ
- コンストラクタやファクトリメソッドで検証を行い、不正な状態のオブジェクトを作らせない
- 値オブジェクトを活用し、プリミティブ型の使用を避ける
- kotlin-resultのSuccess/FailureではなくOk/Errを使用
- **バリデーションは値オブジェクトとドメインモデルのファクトリメソッドで実施**

### 値オブジェクトでの単項目バリデーション

```kotlin
class 氏名 private constructor(val value: String) {
    companion object {
        fun create(value: String): Result<氏名, ValidationError> =
            when {
                value.isBlank() -> Err(ValidationError("氏名は必須です", "NAME_REQUIRED"))
                value.length > 100 -> Err(ValidationError("氏名は100文字以内です", "NAME_TOO_LONG"))
                else -> Ok(氏名(value))
            }
    }
}

class 連絡先 private constructor(val value: String) {
    companion object {
        fun create(value: String): Result<連絡先, ValidationError> =
            when {
                value.isBlank() -> Err(ValidationError("連絡先は必須です", "CONTACT_REQUIRED"))
                !isValidEmail(value) && !isValidPhone(value) -> 
                    Err(ValidationError("連絡先はメールアドレスか電話番号を入力してください", "INVALID_CONTACT"))
                else -> Ok(連絡先(value))
            }
    }
}
```

### ドメインモデルでの複合バリデーション

```kotlin
class 利用申請 private constructor(
    val 申請ID: 申請ID,
    val 氏名: 氏名,
    val 連絡先: 連絡先,
    val 生年月日: 生年月日,
    val 申請日時: Instant
) {
    companion object {
        fun create(
            申請ID: String,
            氏名: String,
            連絡先: String,
            生年月日: LocalDate
        ): Result<利用申請, List<ValidationError>> {
            // 値オブジェクトの生成とバリデーション
            return zipOrAccumulate(
                { 申請ID.create(申請ID) },
                { 氏名.create(氏名) },
                { 連絡先.create(連絡先) },
                { 生年月日.create(生年月日) }
            ) { id, name, contact, birthDate ->
                // 複合バリデーション（相関チェック）
                val age = Period.between(birthDate.value, LocalDate.now()).years
                if (age < 13) {
                    return@zipOrAccumulate Err(listOf(
                        ValidationError("13歳未満は利用できません", "AGE_RESTRICTION")
                    ))
                }
                
                Ok(利用申請(id, name, contact, birthDate, Instant.now()))
            }.flatten()
        }
    }
}
```

### メリット

- ドメインモデルの不整合を防げる
- バリデーションロジックがドメイン層に集約される
- プリミティブ型の誤用を防止