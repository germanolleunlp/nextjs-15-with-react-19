import { type Todo } from "./page";

export default function TodoTableItem({ todo }: { todo: Todo }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {todo.id}
      </th>
      <td className="px-6 py-4">
        {todo.userId}
      </td>
      <td className="px-6 py-4">
        {todo.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center mb-4">
          <input type="checkbox"
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 checked={todo.completed}
                 readOnly />
        </div>
      </td>
    </tr>
  )
}
