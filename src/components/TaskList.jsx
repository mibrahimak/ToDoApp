import React from 'react';
import TaskCard from './TaskCard';

function TaskList({
  tasks,
  users,
  onToggleStatus,
  onSelectTask,
  onDeleteTask,
}) {
  if (tasks.length === 0) {
    return (
      <div className='empty-state text-center py-14 px-6'>
        <div className='inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl mb-4'>
          📋
        </div>
        <p className='text-lg font-semibold text-slate-600'>
          Görüntülenecek görev bulunamadı
        </p>
        <p className='text-sm text-slate-400 mt-2 max-w-sm mx-auto'>
          Filtreleri değiştirmeyi veya yeni bir görev eklemeyi deneyin.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-1'>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          users={users}
          onToggleStatus={onToggleStatus}
          onSelectTask={onSelectTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
