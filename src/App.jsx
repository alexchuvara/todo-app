import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function App() {
  const STORAGE_KEY = 'todo-app-v1';
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }); // {id, title, completed}
  const [filter, setFilter] = useState("all") // all | active | completed

  function addTodo(e) {
    e.preventDefault();
    const name = title.trim();
    if (!name) return;
    const id =
      crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setTodos([{ id, title: name, completed: false }, ...todos]);
    setTitle("");
  }

  function toggle(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }
  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleAll() {
    setTodos((prev) => {
      const allCompleted = prev.length > 0 && prev.every((t) => t.completed);
      return prev.map((t) => ({ ...t, completed: !allCompleted }));
    });
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const remaining = todos.filter((t) => !t.completed).length;
  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 p-4'>
      <div className='max-w-xl mx-auto mt-10'>
        <header className='mb-6'>
          <h1 className='text-4xl font-extrabold tracking-tight'>
            Todo<span className='text-sky-400'>List</span>
          </h1>
          <p className="text-slate-400">Lightweight, persistent and animated</p>
        </header>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='What needs to be done?'
            className='flex-1 rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
          />
          <button
            type='submit'
            className='rounded-xl px-4 py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition'
          >
            Add
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-800">
            <span className="text-sm text-slate-400">{remaining} left</span>
            <div className="flex items-center gap-1">
              {["all", "active", "completed"].map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={
                    'px-3 py-1.5 rounded-full text-sm capitalize transition' +
                    (filter === key
                      ? "bg-slate-800 border border-slate-700 text-sky-300"
                      : "text-slate-400 hover:text-slate-200")
                  }
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleAll} className="text-sm text-slate-400 hover:text-slate-200">Toggle all</button>
              <button onClick={clearCompleted} className="text-sm text-rose-300 hover:text-rose-200">Clear completed</button>
            </div>
          </div>

          <ul role='list' className='divide-y divide-slate-800'>
            {filtered.length === 0 ? (
              <li className='px-4 py-3 text-slate-500'>No tasks yet</li>
            ) : (
              filtered.map((t) => (
                <li key={t.id} className='group flex items-center gap-3 px-4 py-3'>
                  <input
                    type='checkbox'
                    checked={t.completed}
                    onChange={() => toggle(t.id)}
                    className='size-5 accent-sky-500 rounded cursor-pointer'
                  />
                  <span className={`flex-1 ' + (t.completed ? 'line-through text-slate-500' : ''}`}>
                    {t.title}
                  </span>
                  <button
                    onClick={() => removeTodo(t.id)}
                    aria-label={`Delete ${t.title}`}
                    className='opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-rose-300'
                    title='Delete'
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <footer className="mt-6 text-center text-xs text-slate-500">
          <p>Data will persist in your browser (local storage)</p>
        </footer>
      </div>
    </div >
  );
}
