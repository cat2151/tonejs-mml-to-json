/**
 * @name Function Call Graph
 * @description Extract all function call relationships for JavaScript/TypeScript code (maximum loose conditions)
 * @kind problem
 * @problem.severity info
 * @precision low
 * @id javascript/function-call-graph
 * @tags callgraph
 *       maintainability
 *       metrics
 */

import javascript

from CallExpr call, string callerName, string calleeName
where
  // 呼び出し元を特定 - 最大限に甘い条件
  (
    // 関数内からの呼び出し（名前付き）
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      exists(caller.getName()) and
      callerName = caller.getName()
    )
    or
    // 関数内からの呼び出し（無名・アロー）
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      not exists(caller.getName()) and
      callerName = "anonymous_" + caller.getLocation().getStartLine()
    )
    or
    // メソッド内からの呼び出し
    exists(MethodDefinition method |
      call.getEnclosingFunction() = method.getBody() and
      callerName = method.getName()
    )
    or
    // コンストラクタ内からの呼び出し
    exists(Constructor cons |
      call.getEnclosingFunction() = cons and
      callerName = "constructor"
    )
    or
    // グローバルスコープからの呼び出し
    (
      not exists(call.getEnclosingFunction()) and
      callerName = "global"
    )
    or
    // その他すべての場合
    (
      not exists(Function f | call.getEnclosingFunction() = f) and
      callerName = "unknown_" + call.getLocation().getStartLine()
    )
  ) and

  // 呼び出し先を特定 - 最大限に甘い条件
  (
    // 直接的な関数名
    exists(Identifier id |
      call.getCallee() = id and
      calleeName = id.getName()
    )
    or
    // メソッド呼び出し
    exists(PropAccess prop |
      call.getCallee() = prop and
      calleeName = prop.getPropertyName()
    )
    or
    // ネストしたプロパティアクセス a.b.c()
    exists(PropAccess prop |
      call.getCallee() = prop and
      calleeName = prop.toString()
    )
    or
    // その他のコール（new, 複雑な式など）
    (
      not exists(Identifier id | call.getCallee() = id) and
      not exists(PropAccess prop | call.getCallee() = prop) and
      calleeName = call.getCallee().toString()
    )
  )

  // 基本的なフィルタリング
  and callerName != ""
  and calleeName != ""

  // プロジェクトファイル内の関数に限定（src/配下またはプロジェクトルート）
  and (
    call.getLocation().getFile().getAbsolutePath().matches("%/src/%") or
    call.getLocation().getFile().getAbsolutePath().matches("%\\src\\%") or
    // プロジェクトルートのJSファイルも含める
    (
      call.getLocation().getFile().getAbsolutePath().matches("%.js") and
      not call.getLocation().getFile().getAbsolutePath().matches("%node_modules%") and
      not call.getLocation().getFile().getAbsolutePath().matches("%test%") and
      not call.getLocation().getFile().getAbsolutePath().matches("%spec%")
    )
  )

  // 短すぎる関数名を除外（通常は一時変数）
  and calleeName.length() > 2
  and callerName.length() > 2

  // 一般的なライブラリ関数・DOM API・組み込み関数を除外
  and not (
    calleeName.matches("console.%") or
    calleeName.matches("JSON.%") or
    calleeName.matches("Math.%") or
    calleeName.matches("Object.%") or
    calleeName.matches("Array.%") or
    calleeName.matches("String.%") or
    calleeName.matches("Number.%") or
    calleeName.matches("Date.%") or
    calleeName.matches("document.%") or
    calleeName.matches("window.%") or
    calleeName.matches("location.%") or
    calleeName.matches("navigator.%") or
    calleeName.matches("$.%") or
    calleeName.matches("jQuery.%") or
    calleeName.matches("Tone.%") or
    calleeName in [
      "parseInt", "parseFloat", "isNaN", "isFinite", "eval",
      "setTimeout", "setInterval", "clearTimeout", "clearInterval",
      "addEventListener", "removeEventListener", "querySelector",
      "querySelectorAll", "getElementById", "getElementsByClassName",
      "alert", "confirm", "prompt", "fetch", "require", "import"
    ]
  )

select call, callerName + " -> " + calleeName + " (at " + call.getLocation().toString() + ")"
