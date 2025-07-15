/**
 * @name Function Call Graph
 * @description Extract all function call relationships for JavaScript/TypeScript code
 * @kind problem
 * @problem.severity info
 * @precision medium
 * @id javascript/function-call-graph
 * @tags callgraph
 *       maintainability
 *       metrics
 */

import javascript

from CallExpr call, string callerName, string calleeName
where
  // より広範囲の関数呼び出しを検出
  (
    // 1. 関数宣言内からの呼び出し
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      exists(caller.getName()) and
      callerName = caller.getName()
    )
    or
    // 2. イベントハンドラー内からの呼び出し (より広範囲)
    exists(Function arrow |
      call.getEnclosingFunction() = arrow and
      not exists(arrow.getName()) and
      callerName = "anonymous_" + arrow.getLocation().getStartLine()
    )
    or
    // 3. オブジェクトメソッド内からの呼び出し
    exists(Property prop |
      call.getParent*() = prop.getValue() and
      prop.isMethod() and
      callerName = prop.getName()
    )
    or
    // 4. グローバルスコープからの呼び出し
    (
      not exists(call.getEnclosingFunction()) and
      callerName = "global"
    )
  ) and

  // 呼び出し先の名前を特定（より柔軟に）
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
    // コンストラクタ呼び出し
    exists(NewExpr newCall |
      newCall = call and
      exists(Identifier id |
        newCall.getCallee() = id and
        calleeName = "new_" + id.getName()
      )
    )
  ) and

  // フィルタリング条件を緩和
  callerName != "" and
  calleeName != "" and
  calleeName != "require" and
  not calleeName.matches("console%") and
  not calleeName.matches("%prototype%") and
  not calleeName.matches("Object%") and
  not calleeName.matches("Array%") and
  not calleeName.matches("JSON%") and
  not calleeName.matches("Math%") and
  not calleeName.matches("Date%") and
  not calleeName.matches("String%") and
  not calleeName.matches("Number%") and
  not calleeName.matches("Boolean%")

select call, callerName + " -> " + calleeName
