import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function App() {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 p-4'>
      <div className='max-w-xl mx-auto mt-10'>
        <header className='mb-6'>
          <h1 className='text-4xl font-extrabold tracking-tight'>
            Todo<span className='text-sky-400'>List</span>
          </h1>
          <p className="text-slate-400">Lightweight, persistent, and animated</p>
        </header>

        <form className="flex gap-2 mb-4">
          <input
            placeholder='What needs to be done?'
            className='flex-1 rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
          />
          <button
            type='button'
            className='rounded-xl px-4 py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition'
          >
            Add
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-800">
            <span className="text-sm text-slate-400">0 left</span>
            <div className="flex items-center gap-1">
              {["all", "active", "completed"].map((key) => (
                <button
                  key={key}
                  className='px-3 py-1.5 rounded-full text-sm capitalize text-slate-400 hover:text-slate-200'
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm text-slate-400 hover:text-slate-200">Toggle all</button>
              <button className="text-sm text-rose-300 hover:text-rose-200">Clear completed</button>
            </div>
          </div>

          <ul role='list' className='divide-y divide-slate-800'>
            <li px-4 py-3 text-slate-500>No tasks yet</li>
          </ul>
        </div>

        <footer className="mt-6 text-center text-xs text-slate-500">
          <p>Data will persist in your browser (local storage)</p>
        </footer>
      </div>
    </div>
  );
}
