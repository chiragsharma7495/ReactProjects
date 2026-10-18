import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const MIN_COUNT = 0
  const MAX_COUNT = 20

  function handleIncrement() {
    setCount((previousCount) => Math.min(MAX_COUNT, previousCount + step))
  }

  function handleDecrement() {
    setCount((previousCount) => Math.max(MIN_COUNT, previousCount - step))
  }

  function handleReset() {
    setCount(0)
  }

  function handleStepValue(event) {
    const inputValue = Number(event.target.value)
    if (Number.isInteger(inputValue) && inputValue > 0) {
      setStep(inputValue)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Counter exercise
        </p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Counter with rules
        </h1>
        <p className="mb-8 text-slate-500">
          Choose a step and keep the count between 0 and 20.
        </p>

        <div className="mb-8">
          <label
            className="mb-2 block text-left text-sm font-medium text-slate-700"
            htmlFor="step"
          >
            Step value
          </label>
          <input
            id="step"
            type="number"
            min="1"
            step="1"
            value={step}
            onChange={handleStepValue}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <p className="mb-8 text-6xl font-bold tabular-nums text-slate-900">{count}</p>

        <div className="grid grid-cols-3 gap-3">
          <button
            className="rounded-lg bg-indigo-600 px-3 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            type="button"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            className="rounded-lg bg-slate-700 px-3 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            type="button"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            className="rounded-lg border border-slate-300 px-3 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}
