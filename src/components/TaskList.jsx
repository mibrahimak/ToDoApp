import React from 'react';
import TaskCard from './TaskCard';

function TaskList({
  tasks,
  users,
  onToggleStatus,
  onSelectTask,
  onDeleteTask,
}) {
  // --- VERCEL STİLİ EMPTY STATE ---
  if (tasks.length === 0) {
    return (
      <div className="empty-state text-center py-16 px-6 bg-white">
        {/* Büyük renkli kutu yerine şık, minimal bir doku */}
        <div className="inline-flex items-center justify-center text-xl text-vercel-text-muted mb-3 opacity-60">
          📋
        </div>
        <p className="text-sm font-medium text-vercel-text-main tracking-tight">
          Görüntülenecek görev bulunamadı
        </p>
        <p className="text-xs text-vercel-text-muted mt-1 max-w-xs mx-auto leading-relaxed">
          Uygulanan filtreleri değiştirmeyi veya yukarıdaki alandan yeni bir
          takım görevi eklemeyi deneyin.
        </p>
      </div>
    );
  }

  return (
    // Grid veya bitişik liste düzeni için boşlukları sıkılaştırıyoruz
    <div className="space-y-2.5">
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
