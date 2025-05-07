import type { ASTNode } from "./ast-node.types";

export function stringifyAST(node: ASTNode): string {
  try {
    return JSON.stringify(node, null, 2);
  } catch (error) {
    console.error(error);
    return '';
  }
}
