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
      <div className="flex flex-col items-center justify-center min-h-112 gap-4">
        <div className="spinner-premium rounded-full h-12 w-12" />
        <p className="text-slate-600 font-semibold text-sm tracking-wide">
          Takım verileri yükleniyor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-red-50/90 border border-red-200/80 text-red-800 rounded-2xl text-center premium-card">
        <p className="font-bold text-base">Bir hata oluştu</p>
        <p className="text-sm mt-2 text-red-600/90">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <header className="section-header">
        <h2 className="section-title">Takım Görev Panosu</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
          Takımınızın görevlerini filtreleyin, durumlarını güncelleyin ve eş
          zamanlı takip edin.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {tasks.length} görev
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100">
            {pendingCount} devam ediyor
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            {completedCount} tamamlandı
          </span>
        </div>
      </header>

      <CreateTaskForm
        users={users}
        onAddTask={addTask}
        isSubmitting={isSubmitting}
      />

      <FilterBar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onResetStorage={resetStorage}
      />

      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">
          Görev Listesi
        </span>
        <span className="text-xs font-semibold text-indigo-600/80 tabular-nums">
          {tasks.length} kayıt
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
