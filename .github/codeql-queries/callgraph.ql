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

  // フィルタリングを最小限に - 空文字列のみ除外
  and callerName != ""
  and calleeName != ""

select call, callerName + " -> " + calleeName + " (at " + call.getLocation().toString() + ")"
