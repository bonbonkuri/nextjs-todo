'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

const filePath = path.join(process.cwd(), 'data', 'todos.json')

function readTodos(): Todo[] {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Todo[]
}

function writeTodos(todos: Todo[]) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
}

export async function getTodos(): Promise<Todo[]> {
  return readTodos()
}

export async function addTodo(formData: FormData) {
  const text = (formData.get('text') as string)?.trim()
  if (!text) return

  const todos = readTodos()
  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  })
  writeTodos(todos)
  revalidatePath('/')
}

export async function toggleTodo(id: string) {
  const todos = readTodos()
  const todo = todos.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
  writeTodos(todos)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  const todos = readTodos().filter((t) => t.id !== id)
  writeTodos(todos)
  revalidatePath('/')
}
