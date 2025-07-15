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

from CallExpr call, string callerName, string calleeName, string debugInfo
where
  // 呼び出し元を特定
  (
    // 名前付き関数内からの呼び出し
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      exists(caller.getName()) and
      callerName = caller.getName() and
      debugInfo = "from_named_function"
    )
    or
    // 無名関数・アロー関数内からの呼び出し
    exists(Function arrow |
      call.getEnclosingFunction() = arrow and
      not exists(arrow.getName()) and
      callerName = "anonymous_" + arrow.getLocation().getStartLine() and
      debugInfo = "from_anonymous_function"
    )
    or
    // グローバルスコープからの呼び出し
    (
      not exists(call.getEnclosingFunction()) and
      callerName = "global" and
      debugInfo = "from_global"
    )
  ) and

  // 呼び出し先を特定
  (
    // 直接的な関数名への呼び出し
    exists(Identifier id |
      call.getCallee() = id and
      calleeName = id.getName()
    )
    or
    // メソッド呼び出し obj.method()
    exists(PropAccess prop |
      call.getCallee() = prop and
      calleeName = prop.getPropertyName()
    )
  ) and

  // フィルタリング - 基本的なもののみ
  callerName != "" and
  calleeName != "" and
  calleeName != "require" and
  not calleeName.matches("console%")

select call, callerName + " -> " + calleeName + " (" + debugInfo + " at " + call.getLocation().toString() + ")"
