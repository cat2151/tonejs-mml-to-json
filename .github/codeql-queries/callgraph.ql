/**
 * @name Function Call Graph
 * @description Extract function call relationships
 * @kind problem
 * @problem.severity info
 * @precision low
 * @id javascript/function-call-graph
 * @tags callgraph
 *       maintainability
 *       metrics
 */

import javascript

// 方針 : agentがハルシネーションでql破壊を連発するので、ここでは絞り込みせず、後続処理で、nodesとedgesを絞り込む方法で応急対策します


from CallExpr call, string callerName, string calleeName, Location callerLoc, Location calleeLoc
where
  // 呼び出し元を特定
  (
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      exists(caller.getName()) and
      callerName = caller.getName() and
      callerLoc = caller.getLocation()
    )
    or
    exists(Function caller |
      call.getEnclosingFunction() = caller and
      not exists(caller.getName()) and
      callerName = "anonymous_" + caller.getLocation().getStartLine() and
      callerLoc = caller.getLocation()
    )
    or
    exists(MethodDefinition method |
      call.getEnclosingFunction() = method.getBody() and
      callerName = method.getName() and
      callerLoc = method.getLocation()
    )
    or
    exists(Constructor cons |
      call.getEnclosingFunction() = cons and
      callerName = "constructor" and
      callerLoc = cons.getLocation()
    )
    or
    (
      not exists(call.getEnclosingFunction()) and
      callerName = "global" and
      callerLoc = call.getLocation()
    )
    or
    (
      not exists(Function f | call.getEnclosingFunction() = f) and
      callerName = "unknown_" + call.getLocation().getStartLine() and
      callerLoc = call.getLocation()
    )
  ) and

  // 呼び出し先を特定
  (
    exists(Identifier id |
      call.getCallee() = id and
      calleeName = id.getName() and
      exists(Function calleeF | calleeF.getName() = calleeName and calleeLoc = calleeF.getLocation())
    )
    or
    exists(PropAccess prop |
      call.getCallee() = prop and
      calleeName = prop.getPropertyName() and
      exists(MethodDefinition calleeM | calleeM.getName() = calleeName and calleeLoc = calleeM.getLocation())
    )
    or
    (
      not exists(Identifier id | call.getCallee() = id) and
      not exists(PropAccess prop | call.getCallee() = prop) and
      calleeName = call.getCallee().toString() and
      calleeLoc = call.getLocation()
    )
  )

  and callerName != ""
  and calleeName != ""

select call,
  callerName + " (" + callerLoc.toString() + ")"
  + " -> " +
  calleeName + " (" + calleeLoc.toString() + ")"
  + " (at " + call.getLocation().toString() + ")"
