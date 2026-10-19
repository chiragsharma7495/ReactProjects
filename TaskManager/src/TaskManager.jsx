import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    completed: false
  },
  {
    id: 2,
    title: "Practice JavaScript",
    completed: true
  },
  {
    id: 3,
    title: "Build Task Manager",
    completed: false
  }
];

export default function TaskManager(){
    const[tasks, setTasks] = useState(initialTasks);
    const[taskTitle, setTaskTitle] = useState('');
    const[editingId, setEditingId] = useState(null);
    const[editTitle, setEditTitle] = useState('');

    function handleStartEdit(task){
        setEditingId(task.id);
        setEditTitle(task.title);
    }

    function handleSaveEdit(id){
        const trimmedTitle = editTitle.trim();

        if(trimmedTitle === '') return;

        setTasks(previousTask => 
            previousTask.map(task =>
                task.id === id
                ?{...task, title:trimmedTitle}
                :task
            )
        )

        setEditingId(null);
        setEditTitle('');
    }

    function handleTasks(event){
        event.preventDefault();

        const trimmedTitle = taskTitle.trim();

        if(trimmedTitle === '') return;

        const newTask = {
            id: crypto.randomUUID(),
            title: trimmedTitle,
            completed: false
        };

        setTasks(previousTask => [...previousTask, newTask]);
        setTaskTitle('');
    }

    function handleToggleTask(id){
        setTasks(previousTask => 
            previousTask.map(task =>
                task.id === id
                ? {...task, completed: !task.completed}
                :task
            )
        )
    }

    function handleDeleteTasks(id){
        setTasks(previousTask => 
            previousTask.filter(task => task.id !== id)
        )
    }

    return(
        <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 py-10 text-slate-900 sm:px-6">
            <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Task Manager</h1>

            <form onSubmit={handleTasks} className="mb-8 flex flex-col gap-3 sm:flex-row">
                <input 
                    type="text"
                    placeholder="Enter your Task"
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

                <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.98]" >
                    Add Task
                </button>

            </form>


<ul className="space-y-3">
  {tasks.map((task) => (
    <li key={task.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleTask(task.id)}
        className="h-5 w-5 cursor-pointer accent-indigo-600"
      />

      {editingId === task.id ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(event) =>
              setEditTitle(event.target.value)
            }
            className="min-w-0 flex-1 rounded-lg border border-indigo-300 bg-white px-3 py-2 text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={() => handleSaveEdit(task.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="min-w-0 flex-1 break-words font-medium text-slate-700">
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </span>

          <button
            type="button"
            onClick={() => handleStartEdit(task)}
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            Edit
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => handleDeleteTask(task.id)}
        className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-200"
      >
        Delete
      </button>

    </li>
  ))}
</ul>

            </div>
        </section>
    )

}