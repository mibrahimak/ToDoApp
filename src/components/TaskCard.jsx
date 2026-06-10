import React from 'react';

function TaskCard({ task, users, onToggleStatus, onSelectTask, onDeleteTask }) {
  const taskOwner = users.find((user) => user.id === task.userId);

  return (
    <div
      onClick={() => onSelectTask(task)}
      className={`task-card premium-card flex items-center justify-between p-4 sm:p-5 mb-3 ${
        task.completed ? 'task-card--completed' : 'bg-white/80'
      }`}
    >
      <div className="flex-1 pr-4 min-w-0">
        <h4
          className={`text-base font-semibold mb-2.5 transition-all truncate ${
            task.completed ? 'line-through text-slate-400' : 'text-slate-800'
          }`}
        >
          {task.title}
        </h4>
        <span className="badge-assignee">
          <span aria-hidden="true">👤</span>
          {taskOwner ? taskOwner.name : 'Atanmamış'}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(task.id);
          }}
          className={`px-3.5 py-2 text-xs sm:text-sm font-bold text-white rounded-xl shadow-sm transition-all duration-200 ${
            task.completed
              ? 'bg-linear-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200/50'
              : 'bg-linear-to-br from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900'
          }`}
        >
          {task.completed ? 'Tamamlandı' : 'Devam ediyor'}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task.id);
          }}
          className="p-2.5 text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200/80 transition-all hover:shadow-sm"
          title="Görevi Sil"
        >
          <span aria-hidden="true">🗑</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
