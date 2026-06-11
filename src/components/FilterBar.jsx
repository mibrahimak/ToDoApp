import React from 'react';

function FilterBar({
  users,
  selectedUser,
  setSelectedUser,
  selectedStatus,
  setSelectedStatus,
  onResetStorage,
}) {
  const hasActiveFilters = selectedUser !== 'all' || selectedStatus !== 'all';

  return (
    <div className="space-y-4 mb-8">
      <div className="filter-panel p-5 flex flex-col sm:flex-row gap-5 items-end justify-between bg-white border border-vercel-line rounded-vercel">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center">
          <div className="w-full sm:w-60">
            <label className="block text-[10px] font-medium text-vercel-text-muted uppercase tracking-wider mb-1.5">
              Görev Sahibi
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="input-premium cursor-pointer"
            >
              <option value="all">Tüm Takım Üyeleri</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-44">
            <label className="block text-[10px] font-medium text-vercel-text-muted uppercase tracking-wider mb-1.5">
              Durum
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-premium cursor-pointer"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="completed">Tamamlananlar</option>
              <option value="pending">Devam Edenler</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSelectedUser('all');
              setSelectedStatus('all');
            }}
            className="text-xs font-medium text-vercel-text-main hover:bg-vercel-canvas border border-vercel-line px-3 py-1.5 rounded-vercel transition-colors shrink-0 cursor-pointer w-full sm:w-auto text-center"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>

      <div className="flex justify-end px-1">
        <button
          type="button"
          onClick={onResetStorage}
          className="px-3 py-1.5 text-xs font-medium text-vercel-text-muted hover:text-vercel-danger hover:bg-vercel-danger/5 rounded-vercel transition-all cursor-pointer border border-transparent hover:border-vercel-danger/20"
        >
          Sistem Verilerini Sıfırla
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
