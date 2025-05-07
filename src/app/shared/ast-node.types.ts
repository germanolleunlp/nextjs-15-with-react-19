export enum OperationTypes {
  "ADDITION" = "ADDITION",
  "SUBTRACTION" = "SUBTRACTION",
  "MULTIPLICATION" = "MULTIPLICATION",
  "DIVISION" = "DIVISION",
}

export enum ValueTypes {
  "NUMBER" = "NUMBER",
  "E" = "E",
  "PI" = "PI",
}

export enum FuncTypes {
  "SQRT" = "SQRT",
  "SQR" = "SQR",
}

export enum SignTypes {
  "PAREN" = "PAREN",
  "POWER" = "POWER",
}

const VARIABLE_VALUE = 'VARIABLE';
export type VariableType = string & {  readonly [VARIABLE_VALUE]: void }
export const VARIABLE = VARIABLE_VALUE as VariableType;

const FUNC_VALUE = 'FUNCTION';
export type FuncType = string & { readonly [FUNC_VALUE]: void }
export const FUNC = FUNC_VALUE as FuncType;

interface IBaseNode {
  type: string;
}

interface ISign extends IBaseNode {
  expression: ASTNode;
}

export type Paren = ISign & {
  type: SignTypes.PAREN;
}

export type Power = ISign & {
  type: SignTypes.POWER;
  power: ASTNode;
}

export type Oper = IBaseNode & {
  type: OperationTypes;
  left: ASTNode;
  right: ASTNode;
}

export type Value = IBaseNode & {
  type: ValueTypes;
  value: number | string;
}

export type Var = IBaseNode & {
  type: VariableType;
  name: string;
}

export type Func = IBaseNode & {
  type: FuncType;
  name: FuncTypes;
  arguments: ASTNode[];
}

export type ASTNode = Paren | Power | Oper | Value | Var | Func;
