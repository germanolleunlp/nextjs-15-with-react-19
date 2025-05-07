import {
  ASTNode,
  FUNC,
  FuncTypes,
  OperationTypes,
  SignTypes,
  VARIABLE,
  ValueTypes
} from "@/app/shared/ast-node.types";

interface IATSNodeVisitor {
  visitParen(expression: ASTNode): ASTNode;
  visitPower(base: ASTNode, exponent: ASTNode): ASTNode;
  visitOper(op: OperationTypes, left: ASTNode, right: ASTNode): ASTNode;
  visitValue(value: number): ASTNode;
  visitConstant(name: string): ASTNode;
  visitVar(name: string): ASTNode;
  visitFunc(name: string, args: ASTNode[]): ASTNode;
  visit(precedence?: number): ASTNode;
  visitAsync(precedence?: number): Promise<ASTNode>;
}

enum Operations {
  'ADDITION' = '+',
  'SUBTRACTION' = '-',
  'MULTIPLICATION' = '*',
  'DIVISION' = '/',
  'POWER' = '^',
}

const CONSTANTS = new Set<ValueTypes>([ValueTypes.E, ValueTypes.PI]);

type TokenType = 'CONSTANT' | 'NUMBER' | 'VARIABLE' | 'OPERATION' | 'PAREN' | 'FUNC' | 'COMMA';

interface Token {
  type: TokenType;
  value: string;
}

function isVariable(char: string): boolean {
  return char === '$';
}

function isOperation(char: string): boolean {
  return Object.values(Operations).includes(char as Operations);
}

function isParen(char: string): boolean {
  return char === '(' || char === ')';
}

function isComma(char: string): boolean {
  return char === ','
}

function isUnderscore(char: string): boolean {
  return char === '_';
}

function isWhiteSpace(char: string): boolean {
  return char === ' ';
}

function isDigit(char: string): boolean {
  if (isWhiteSpace(char)) return false;
  const n = Number(char);
  return n >= 0 && n <= 9;
}

function isLetter(char: string): boolean {
  if (isWhiteSpace(char)) return false;
  return char.toUpperCase() !== char.toLowerCase();
}

function tokenize(expression: string): Token[] {
  const end = expression.length;
  const tokens: Token[] = [];
  let i = 0;

  while (i < end) {
    const char = expression[i];

    if (isWhiteSpace(char)) {
      i++;
      continue;
    }

    if (isDigit(char)) {
      let num = char;
      i++;
      while (i < end && isDigit(expression[i])) {
        num += expression[i];
        i++;
      }

      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    if (isVariable(char)) {
      let name = char;
      i++;
      while (i < end && (isDigit(expression[i]) || isLetter(expression[i]) || isUnderscore(expression[i]))) {
        name += expression[i];
        i++;
      }

      tokens.push({ type: 'VARIABLE', value: name });
      continue;
    }

    if (isLetter(char)) {
      let ident = char;
      i++;
      while (i < end && isLetter(expression[i])) {
        ident += expression[i];
        i++;
      }

      const upper = ident.toUpperCase();
      if (CONSTANTS.has(upper as ValueTypes)) {
        console.log(upper);
        tokens.push({ type: 'CONSTANT', value: upper });
      } else {
        tokens.push({ type: 'FUNC', value: upper });
      }

      continue;
    }

    if (isOperation(char)) {
      tokens.push({ type: 'OPERATION', value: char });
      i++;
      continue;
    }

    if (isParen(char)) {
      tokens.push({ type: 'PAREN', value: char });
      i++;
      continue;
    }

    if (isComma(char)) {
      tokens.push({ type: 'COMMA', value: ',' });
      i++;
      continue;
    }

    throw new Error(`Expected character ${char}`);
  }

  return tokens;
}

export default class ATSNodeVisitor implements IATSNodeVisitor {
  private pos: number;
  private readonly tokens: Token[];

  constructor(expression: string) {
    this.tokens = tokenize(expression);
    this.pos = 0;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token {
    return this.tokens[this.pos++];
  }

  private match(value: string): boolean {
    if (this.peek()?.value === value) {
      this.next();
      return true;
    }

    return false;
  }

  private getPrecedence(op: string): number {
    switch (op) {
      case Operations.ADDITION:
      case Operations.SUBTRACTION: return 1;
      case Operations.MULTIPLICATION:
      case Operations.DIVISION: return 2;
      case Operations.POWER: return 3;
      default: return 0;
    }
  }

  private getOperationType(op: string): OperationTypes {
    switch (op) {
      case Operations.ADDITION: return OperationTypes.ADDITION;
      case Operations.SUBTRACTION: return OperationTypes.SUBTRACTION;
      case Operations.MULTIPLICATION: return OperationTypes.MULTIPLICATION;
      case Operations.DIVISION: return OperationTypes.DIVISION;
      default: throw new Error(`Unsupported operator: ${op}`);
    }
  }

  private parse(): ASTNode {
    const token = this.next();

    if (token.type === 'NUMBER') {
      return this.visitValue(Number(token.value));
    }

    if (token.type === 'CONSTANT') {
      return this.visitConstant(token.value);
    }

    if (token.type === 'VARIABLE') {
      return this.visitVar(token.value);
    }

    if (token.type === 'PAREN' && token.value === '(') {
      const expression = this.visit();
      if (!this.match(')')) throw new Error("Expected ')'");
      return this.visitParen(expression);
    }

    if (token.type === 'FUNC') {
      if (!this.match('(')) throw new Error(`Expected '(' after calling a function`);

      const args: ASTNode[] = [];
      const name = token.value;

      if (this.peek()?.value !== ')') {
        args.push(this.visit());
        while (this.match(',')) {
          args.push(this.visit());
        }
      }

      if (!this.match(')')) throw new Error(`Expected '(' after function arguments'`);
      return this.visitFunc(name, args);
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  visit(precedence = 0): ASTNode {
    let left = this.parse();

    while (this.peek()) {
      try {
        const token = this.peek();
        if (!token || token.type !== 'OPERATION') break;

        const pre = this.getPrecedence(token.value);
        if (pre < precedence) break;

        const op = this.next().value;
        const right = this.visit(pre + 1);
        const opType = this.getOperationType(op);
        left = this.visitOper(opType, left, right);
      } catch (error) {
        console.error(error);
        break;
      }
    }

    return left;
  }

  visitAsync(precedence = 0): Promise<ASTNode> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.visit(precedence))
      }, 1000)
    });
  }

  visitParen(expression: ASTNode): ASTNode {
    return {
      type: SignTypes.PAREN,
      expression
    };
  }

  visitPower(base: ASTNode, exponent: ASTNode): ASTNode {
    return {
      type: SignTypes.POWER,
      expression: base,
      power: exponent
    };
  }

  visitOper(op: OperationTypes, left: ASTNode, right: ASTNode): ASTNode {
    return {
      type: op,
      left,
      right
    };
  }

  visitValue(value: number): ASTNode {
    return {
      type: ValueTypes.NUMBER,
      value
    };
  }

  visitConstant(name: string): ASTNode {
    return {
      type: name as ValueTypes,
      value: name,
    };
  }

  visitVar(name: string): ASTNode {
    return {
      type: VARIABLE,
      name
    };
  }

  visitFunc(name: string, args: ASTNode[]): ASTNode {
    return {
      type: FUNC,
      name: name as FuncTypes,
      arguments: args
    };
  }
}
