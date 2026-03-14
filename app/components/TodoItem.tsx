'use client'

import { toggleTodo, deleteTodo } from '@/app/actions'
import { Todo } from '@/app/actions'

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group">
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-400'
        }`}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        {todo.completed && (
          <svg viewBox="0 0 20 20" fill="white" className="w-full h-full p-0.5">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
        aria-label="削除"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 6a1 1 0 112 0v5a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v5a1 1 0 11-2 0V8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  )
}
