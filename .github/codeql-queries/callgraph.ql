/**
 * @name Function Call Graph
 * @description Extract function call relationships for project-defined functions only
 * @kind problem
 * @problem.severity info
 * @precision low
 * @id javascript/function-call-graph
 * @tags callgraph
 *       maintainability
 *       metrics
 */

import javascript

// プロジェクト内で定義された関数名を自動検出
predicate isProjectFunction(string functionName) {
  exists(Function func |
    // まず除外条件をチェック
    not func.getLocation().getFile().getAbsolutePath().matches("%grammar.js") and
    not func.getLocation().getFile().getAbsolutePath().matches("%parser.js") and
    not func.getLocation().getFile().getAbsolutePath().matches("%.peg.js") and
    not func.getLocation().getFile().getAbsolutePath().matches("%node_modules%") and
    not func.getLocation().getFile().getAbsolutePath().matches("%test%") and
    not func.getLocation().getFile().getAbsolutePath().matches("%spec%") and
    not func.getLocation().getFile().getAbsolutePath().matches("%dev-setup%") and

    // 次にプロジェクトファイル内で定義された関数を含める
    (
      func.getLocation().getFile().getAbsolutePath().matches("%/src/%") or
      func.getLocation().getFile().getAbsolutePath().matches("%\\src\\%") or
      func.getLocation().getFile().getAbsolutePath().matches("%.js")
    ) and

    exists(func.getName()) and
    functionName = func.getName() and
    // 短すぎる関数名を除外
    functionName.length() > 2 and
    // PEG.js系の関数を除外
    not functionName.matches("peg$%") and
    not functionName.matches("anonymous_%") and
    not functionName.matches("unknown_%") and
    // 標準ライブラリ関数を明示的に除外
    not functionName in [
      "toString", "constructor", "valueOf", "hasOwnProperty",
      "push", "pop", "shift", "unshift", "slice", "splice", "concat",
      "log", "error", "warn", "info", "debug",
      "replace", "trim", "split", "join", "toLowerCase", "toUpperCase",
      "map", "forEach", "filter", "reduce", "find", "some", "every",
      "addEventListener", "removeEventListener", "getElementById", "querySelector",
      "require", "module", "exports", "console",
      "setTimeout", "setInterval", "clearTimeout", "clearInterval",
      "parseInt", "parseFloat", "isNaN", "isFinite",
      "exec", "test", "match", "search", "includes", "indexOf", "lastIndexOf",
      "substr", "substring", "charAt", "charCodeAt", "codePointAt",
      "startsWith", "endsWith", "padStart", "padEnd",
      "sort", "reverse", "isArray", "from",
      "keys", "values", "entries", "assign", "create",
      "stringify", "parse", "call", "apply", "bind",
      "connect", "dispose", "start", "stop", "play", "pause",
      "writeFileSync", "readFileSync", "existsSync", "mkdirSync", "execSync",
      "resolve", "relative", "dirname", "basename", "extname",
      "all", "race", "resolve", "reject", "then", "catch", "finally"
    ]
  )
}

from CallExpr call, string callerName, string calleeName
where
  // 呼び出し元を特定
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

  // 呼び出し先を特定
  (
    // 直接的な関数名
    exists(Identifier id |
      call.getCallee() = id and
      calleeName = id.getName()
    )
    or
    // メソッド呼び出し（プロパティ名を優先）
    exists(PropAccess prop |
      call.getCallee() = prop and
      calleeName = prop.getPropertyName()
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

  // 除外対象ファイル内での呼び出しを全て除外
  and not call.getLocation().getFile().getAbsolutePath().matches("%grammar.js")
  and not call.getLocation().getFile().getAbsolutePath().matches("%parser.js")
  and not call.getLocation().getFile().getAbsolutePath().matches("%.peg.js")
  and not call.getLocation().getFile().getAbsolutePath().matches("%node_modules%")
  and not call.getLocation().getFile().getAbsolutePath().matches("%test%")
  and not call.getLocation().getFile().getAbsolutePath().matches("%spec%")
  and not call.getLocation().getFile().getAbsolutePath().matches("%dev-setup%")

  // プロジェクト内で定義された関数のみを含める
  and isProjectFunction(calleeName)

  // 呼び出し元もプロジェクト内の関数に限定（グローバルとunknownは例外）
  and (isProjectFunction(callerName) or callerName = "global" or callerName.matches("unknown_%") or callerName.matches("anonymous_%"))

select call, callerName + " -> " + calleeName + " (at " + call.getLocation().toString() + ")"
