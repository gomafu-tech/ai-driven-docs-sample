# API仕様書自動生成

## 背景

APIドキュメントの保守コストを削減し、常に最新の仕様を提供するため、コードからの自動生成を採用する。

## 決定

### springdoc-openapiによる自動生成

- springdoc-openapiを使用してOpenAPI仕様書を自動生成
- ControllerクラスにOpenAPIアノテーションを付与
- Swagger UIでAPIドキュメントを提供

### 依存関係設定

```kotlin
// build.gradle.kts
dependencies {
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")
    implementation("org.springdoc:springdoc-openapi-starter-common:2.2.0")
}
```

### Controller実装例

```kotlin
@RestController
@RequestMapping("/api/v1/applications")
@Tag(name = "利用申請", description = "図書館利用申請に関するAPI")
class 利用申請Controller(
    private val 個人利用申請提出UseCase: 個人利用申請提出UseCase
) {
    @PostMapping
    @Operation(
        summary = "利用申請の提出",
        description = "新規の図書館利用申請を提出します"
    )
    @ApiResponses(
        ApiResponse(responseCode = "201", description = "申請が正常に提出されました"),
        ApiResponse(responseCode = "400", description = "バリデーションエラー"),
        ApiResponse(responseCode = "500", description = "サーバーエラー")
    )
    fun submit(
        @RequestBody @Valid
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "利用申請情報",
            required = true
        )
        request: 利用申請Request
    ): ResponseEntity<利用申請Response> {
        val param = 個人利用申請提出Param(
            氏名 = request.name,
            連絡先 = request.contact,
            生年月日 = LocalDate.parse(request.birthDate)
        )
        
        val data = 個人利用申請提出UseCase.handle(param)
        
        val response = 利用申請Response(
            applicationId = data.申請ID,
            status = data.承認状態
        )
        
        return ResponseEntity.status(201).body(response)
    }
    
    @GetMapping("/{申請ID}")
    @Operation(
        summary = "利用申請の取得",
        description = "指定されたIDの利用申請を取得します"
    )
    fun getApplication(
        @PathVariable
        @Parameter(description = "申請ID", example = "01234567890123456789012345")
        申請ID: String
    ): ResponseEntity<利用申請Response> {
        // 実装
    }
}
```

### Request/Responseクラスの文書化

```kotlin
@Schema(description = "利用申請リクエスト")
data class 利用申請Request(
    @field:Schema(
        description = "申請者氏名",
        example = "田中太郎",
        minLength = 1,
        maxLength = 100
    )
    @field:NotBlank(message = "氏名は必須です")
    val name: String,
    
    @field:Schema(
        description = "連絡先（メールアドレスまたは電話番号）",
        example = "tanaka@example.com"
    )
    @field:NotBlank(message = "連絡先は必須です")
    val contact: String,
    
    @field:Schema(
        description = "生年月日（ISO8601形式）",
        example = "1990-01-01",
        pattern = "yyyy-MM-dd"
    )
    @field:NotBlank(message = "生年月日は必須です")
    val birthDate: String
)

@Schema(description = "利用申請レスポンス")
data class 利用申請Response(
    @field:Schema(
        description = "申請ID",
        example = "01234567890123456789012345"
    )
    val applicationId: String,
    
    @field:Schema(
        description = "申請状態",
        example = "申請中",
        allowableValues = ["申請中", "承認済", "却下"]
    )
    val status: String,
    
    @field:Schema(
        description = "申請日時（ISO8601形式）",
        example = "2024-01-01T09:00:00Z"
    )
    val submittedAt: String
)
```

### エラーレスポンスの文書化

```kotlin
@Schema(description = "エラーレスポンス")
data class ErrorResponse(
    @field:Schema(description = "エラー一覧")
    val errors: List<Error>
)

@Schema(description = "個別エラー")
data class Error(
    @field:Schema(
        description = "エラーコード",
        example = "400001"
    )
    val code: String,
    
    @field:Schema(
        description = "エラーメッセージ",
        example = "氏名は必須です"
    )
    val message: String
)
```

### OpenAPI設定

```kotlin
@Configuration
class OpenApiConfig {
    
    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("図書館システム API")
                    .description("地方最大級の図書館貸出し予約システムのAPI仕様書")
                    .version("v1.0.0")
                    .contact(
                        Contact()
                            .name("開発チーム")
                            .email("dev-team@library.example.com")
                    )
            )
            .servers(
                listOf(
                    Server()
                        .url("https://api.library.example.com")
                        .description("本番環境"),
                    Server()
                        .url("https://api-staging.library.example.com")
                        .description("ステージング環境"),
                    Server()
                        .url("http://localhost:8080")
                        .description("開発環境")
                )
            )
            .components(
                Components()
                    .securitySchemes(
                        mapOf(
                            "bearerAuth" to SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                        )
                    )
            )
            .addSecurityItem(
                SecurityRequirement().addList("bearerAuth")
            )
    }
}
```

### アプリケーション設定

```yaml
# application.yml
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    displayRequestDuration: true
    groups-order: DESC
    operationsSorter: method
    disable-swagger-default-url: true
    use-root-path: true
  show-actuator: false
  group-configs:
    - group: "図書館API"
      paths-to-match: "/api/**"
```

### セキュリティ考慮

```kotlin
@RestController
@Tag(name = "管理者用API", description = "管理者のみアクセス可能")
@SecurityRequirement(name = "bearerAuth")
class 管理者Controller {
    
    @GetMapping("/api/v1/admin/applications")
    @Operation(
        summary = "全申請一覧取得",
        description = "管理者権限が必要です",
        security = [SecurityRequirement(name = "bearerAuth")]
    )
    @PreAuthorize("hasRole('ADMIN')")
    fun getAllApplications(): List<利用申請Response> {
        // 実装
    }
}
```

### カスタムアノテーション

```kotlin
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@Operation(
    responses = [
        ApiResponse(responseCode = "400", description = "バリデーションエラー"),
        ApiResponse(responseCode = "401", description = "認証エラー"),
        ApiResponse(responseCode = "500", description = "サーバーエラー")
    ]
)
annotation class StandardApiResponses
```

### 使用例

```kotlin
@PostMapping("/submit")
@StandardApiResponses
@ApiResponse(responseCode = "201", description = "申請が正常に提出されました")
fun submitApplication(@RequestBody request: 利用申請Request): ResponseEntity<利用申請Response> {
    // 実装
}
```

### アクセス先

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/api-docs`
- **OpenAPI YAML**: `http://localhost:8080/api-docs.yaml`

### メリット

- コードとドキュメントの同期が自動的に保たれる
- 実装者がアノテーションを追加することで自然とドキュメントが充実
- Swagger UIでAPIの動作確認が可能
- フロントエンド開発者との連携が円滑