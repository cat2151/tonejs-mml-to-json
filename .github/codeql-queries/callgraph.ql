/**
 * @name Function Call Graph
 * @description Extract all function call relationships for JavaScript/TypeScript code
 * @kind problem
 * @problem.severity info
 * @precision high
 * @id javascript/function-call-graph
 * @tags callgraph
 *       maintainability
 *       metrics
 */

import javascript

from DataFlow::CallNode call, Function caller, Function callee
where
  // 呼び出し元関数を特定
  caller = call.getEnclosingFunction() and

  // 呼び出し先関数を特定
  (
    // 直接的な関数呼び出し
    callee = call.getACallee()
    or
    // メソッド呼び出しの場合
    exists(DataFlow::PropRead read |
      read = call.getReceiver().getAPropertyRead() and
      callee = read.getAPropertySource()
    )
  ) and

  // 名前が存在する関数のみを対象とする
  exists(caller.getName()) and
  exists(callee.getName()) and

  // 自己再帰呼び出しは除外しない（含める）
  // 匿名関数や無名関数は除外
  not caller.getName() = "" and
  not callee.getName() = ""

select call, caller.getName() + " -> " + callee.getName()
