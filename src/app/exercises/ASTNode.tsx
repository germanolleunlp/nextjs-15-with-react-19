'use client';

import { FormEvent, useState, useTransition } from "react";
import {
  type ASTNode,
  VARIABLE,
  FUNC,
  OperationTypes,
  SignTypes,
  FuncTypes,
  ValueTypes
} from "@/app/shared/ast-node.types";
import { asyncASTtoString } from "@/app/shared/ast-node-iterator";
import { stringifyAST } from "@/app/shared/ast-utils";
import ATSNodeVisitor from "@/app/shared/ast-node-visitor";

const example: ASTNode = {
  type: OperationTypes.DIVISION,
  left: {
    type: SignTypes.PAREN,
    expression: {
      type: OperationTypes.ADDITION,
      left: {
        type: VARIABLE,
        name: '$b'
      },
      right: {
        type: FUNC,
        name: FuncTypes.SQRT,
        arguments: [
          {
            type: OperationTypes.SUBTRACTION,
            left: {
              type: FUNC,
              name: FuncTypes.SQR,
              arguments: [
                {
                  type: VARIABLE,
                  name: '$b',
                }
              ]
            },
            right: {
              type: OperationTypes.MULTIPLICATION,
              left: {
                type: ValueTypes.NUMBER,
                value: 4,
              },
              right: {
                type: VARIABLE,
                name: '$a'
              }
            }
          }
        ]
      }
    }
  },
  right: {
    type: SignTypes.PAREN,
    expression: {
      type: OperationTypes.MULTIPLICATION,
      left: {
        type: ValueTypes.NUMBER,
        value: 2
      },
      right: {
        type: VARIABLE,
        name: '$a'
      }
    }
  }
};

export default function ASTNode() {
  const [expression, setExpression] = useState<string>('');
  const [node, setNode] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!node?.trim()) return;

    setExpression('');
    startTransition(async () => {
      let result = '';
      try {
        result = await asyncASTtoString(JSON.parse(node));
        setExpression(result);
      } catch (error) {
        console.error(error);
      }
    })
  }

  const handleExpression = () => {
    if (!expression.trim()) return;

    // setExpression('');
    startTransition(async () => {
      let result = '';
      try {
        const visitor = new ATSNodeVisitor(expression);
        result = stringifyAST(await visitor.visitAsync());
        setNode(result);
      } catch (error) {
        console.error(error);
      }
    })
  }

  const handleExample = () => {
    setNode(stringifyAST(example))
  }

  const handleClear = () => {
    setNode('');
    setExpression('');
  }

  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit}>
        <fieldset className="my-4">
          <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input name="expression"
                      type="text"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={expression}
                      placeholder="Enter expression"
                      onChange={(e) => setExpression(e.target.value)}/>
          </label>
          <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <textarea name="node"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      rows={25}
                      value={node}
                      onChange={(e) => setNode(e.target.value)}/>
          </label>
          {isPending && <p>Loading...</p>}
          {!isPending && (
            <div className=" flex gap-4 mt-4">
              <button type="submit"
                      className="py-1 px-3 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Submit AST
              </button>
              <button type="button"
                      onClick={handleExpression}
                      className="py-1 px-3 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Submit Expression
              </button>
              <button type="button"
                      onClick={handleExample}
                      className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Fill with example
              </button>
              <button type="button"
                      onClick={handleClear}
                      className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Clear
              </button>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  )
}
