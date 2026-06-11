import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskModal from '../components/TaskModal';

function Dashboard() {
  const {
    tasks,
    users,
    isLoading,
    error,
    toggleTaskStatus,
    selectedUser,
    setSelectedUser,
    selectedStatus,
    setSelectedStatus,
    addTask,
    isSubmitting,
    deleteTask,
    resetStorage,
  } = useTasks();

  const [activeTask, setActiveTask] = useState(null);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-112 gap-3">
        <div className="spinner-premium rounded-full h-8 w-8" />
        <p className="text-vercel-text-muted text-xs tracking-tight">
          Takım verileri yükleniyor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12 p-5 bg-white border border-red-200 text-[#ee0000] rounded-vercel text-center">
        <p className="font-semibold text-sm">Bir hata oluştu</p>
        <p className="text-xs mt-1 opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="section-header border-b border-vercel-line pb-6">
        <h2 className="section-title tracking-tight">Takım Görev Panosu</h2>
        <p className="text-sm text-vercel-text-muted mt-1.5 max-w-xl leading-relaxed">
          Takımınızın görevlerini filtreleyin, durumlarını güncelleyin ve eş
          zamanlı takip edin.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-vercel-bg text-vercel-text-main border border-vercel-line">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />{' '}
            {tasks.length} görev
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-vercel-bg text-vercel-text-muted border border-vercel-line">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
            {pendingCount} devam ediyor
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-vercel-bg text-vercel-text-muted border border-vercel-line">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
            {completedCount} tamamlandı
          </span>
        </div>
      </header>

      <div className="mb-8 mt-8">
        <CreateTaskForm
          users={users}
          onAddTask={addTask}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="mb-8">
        <FilterBar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onResetStorage={resetStorage}
        />
      </div>

      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-[11px] font-medium text-vercel-text-muted uppercase tracking-wider">
          Görev Listesi
        </span>
        <span className="text-xs text-vercel-text-muted tabular-nums">
          {tasks.length} kayıt listelendi
        </span>
      </div>

      <TaskList
        tasks={tasks}
        users={users}
        onToggleStatus={toggleTaskStatus}
        onSelectTask={setActiveTask}
        onDeleteTask={deleteTask}
      />

      {activeTask && (
        <TaskModal
          task={activeTask}
          users={users}
          onClose={() => setActiveTask(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
