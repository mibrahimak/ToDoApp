import React from 'react';

function FilterBar({
  users,
  selectedUser,
  setSelectedUser,
  selectedStatus,
  setSelectedStatus,
  onResetStorage,
}) {
  const hasActiveFilters =
    selectedUser !== 'all' || selectedStatus !== 'all';

  return (
    <div className='space-y-3 mb-6'>
      <div className='filter-panel p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center'>
          <div className='w-full sm:w-64'>
            <label className='block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'>
              Görev Sahibi
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className='input-premium shadow-sm'
            >
              <option value='all'>Tüm Takım Üyeleri</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className='w-full sm:w-48'>
            <label className='block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'>
              Durum
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='input-premium shadow-sm'
            >
              <option value='all'>Tüm Durumlar</option>
              <option value='completed'>Tamamlananlar</option>
              <option value='pending'>Devam Edenler</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type='button'
            onClick={() => {
              setSelectedUser('all');
              setSelectedStatus('all');
            }}
            className='text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors px-3 py-2 rounded-lg hover:bg-rose-50 shrink-0'
          >
            Filtreleri temizle
          </button>
        )}
      </div>

      <div className='flex justify-end px-1'>
        <button
          type='button'
          onClick={onResetStorage}
          className='text-xs font-medium text-slate-400 hover:text-slate-600 bg-white/60 hover:bg-white border border-slate-200/80 px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow'
        >
          Sistem verilerini sıfırla
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
