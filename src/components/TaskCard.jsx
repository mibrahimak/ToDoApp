import React from 'react';

function TaskCard({ task, users, onToggleStatus, onSelectTask, onDeleteTask }) {
  const taskOwner = users.find((user) => user.id === task.userId);

  return (
    <div
      onClick={() => onSelectTask(task)}
      className={`task-card premium-card flex items-center justify-between p-4 transition-all cursor-pointer
        ${task.completed ? 'task-card--completed' : 'bg-white'}`}
    >
      <div className="flex-1 pr-4 min-w-0">
        <h4
          className={`text-sm font-medium mb-2 transition-colors truncate tracking-tight
            ${task.completed ? 'line-through text-vercel-text-muted opacity-60' : 'text-vercel-text-main'}`}
        >
          {task.title}
        </h4>

        <span className="badge-assignee">
          <span aria-hidden="true" className="text-[10px] opacity-70">
            👤
          </span>
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
          className={`px-3 py-1.5 text-xs font-medium border rounded-vercel transition-colors cursor-pointer
            ${
              task.completed
                ? 'bg-vercel-canvas border-vercel-line text-vercel-text-muted hover:bg-vercel-line'
                : 'bg-vercel-text-main border-vercel-text-main text-white hover:bg-white hover:text-vercel-text-main'
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
          className="p-1.5 text-xs text-vercel-text-muted hover:text-vercel-danger hover:bg-vercel-danger/5 border border-transparent hover:border-vercel-danger/20 rounded-vercel transition-all cursor-pointer"
          title="Görevi Sil"
        >
          <span aria-hidden="true">Sil</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
