import { getTodos, addTodo } from '@/app/actions'
import TodoItem from '@/app/components/TodoItem'

export default async function Home() {
  const todos = await getTodos()
  const completed = todos.filter((t) => t.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todoリスト</h1>
        <p className="text-sm text-gray-500 mb-8">
          {todos.length > 0
            ? `${completed} / ${todos.length} 完了`
            : 'タスクを追加してください'}
        </p>

        {/* 入力フォーム */}
        <form action={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            name="text"
            placeholder="新しいタスクを入力..."
            required
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
          >
            追加
          </button>
        </form>

        {/* Todoリスト */}
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-12 h-12 mx-auto mb-3 opacity-40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-sm">タスクがありません</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}

        {/* 進捗バー */}
        {todos.length > 0 && (
          <div className="mt-6">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(completed / todos.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
