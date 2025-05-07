import {
  type ASTNode,
  type Paren,
  type Power,
  type Oper,
  type Func,
  type Value,
  type Var,
  VARIABLE,
  FUNC,
  OperationTypes,
  SignTypes,
  ValueTypes
} from "./ast-node.types";

export function AstToString(node: ASTNode): string {
  const n = node;

  if (n.type === SignTypes.PAREN) {
    return `(${AstToString((n as Paren).expression)})`
  }

  if (n.type === SignTypes.POWER) {
    const pow = n as Power;
    return `${AstToString(pow.expression)}^${AstToString(pow.power)}`
  }

  if (n.type === VARIABLE) {
    return (n as Var).name
  }

  if (Object.values(OperationTypes).includes(n.type as OperationTypes)) {
    let sign = '';
    switch (n.type) {
      case OperationTypes.ADDITION:
        sign = '+';
        break;
      case OperationTypes.SUBTRACTION:
        sign = '-';
        break;
      case OperationTypes.DIVISION:
        sign = '/';
        break;
      case OperationTypes.MULTIPLICATION:
        sign = '*';
        break;
    }

    const operation = n as Oper;
    return `${AstToString(operation.left)} ${sign} ${AstToString(operation.right)}`
  }

  if (n.type === FUNC) {
    const func = n as Func;
    const args = func.arguments.map((arg) => AstToString(arg));
    return `${func.name.toUpperCase()}(${args.join(', ')})`
  }

  if (n.type === ValueTypes.NUMBER) {
    return `${(n as Value).value}`;
  }

  if ([ValueTypes.E, ValueTypes.PI].includes(n.type as ValueTypes)) {
    return `${n.type}`
  }

  return '';
}

export function asyncASTtoString(node: ASTNode): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AstToString(node))
    }, 1000)
  });
}
