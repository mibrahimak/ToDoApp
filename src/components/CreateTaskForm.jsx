import React, { useState } from 'react';

function CreateTaskForm({ users, onAddTask, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !userId) {
      alert('Lütfen görev başlığını girin ve bir takım üyesi seçin.');
      return;
    }

    onAddTask(title, userId);
    setTitle('');
    setUserId('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card p-6 bg-white border border-vercel-line rounded-vercel mb-8"
    >
      {/* Form Başlık Alanı - Monokrom ve Zarif */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-vercel-text-main text-white text-xs font-medium">
          +
        </span>
        <h3 className="text-[11px] font-medium text-vercel-text-muted uppercase tracking-wider">
          Yeni Takım Görevi
        </h3>
      </div>

      {/* Input Grid Alanı */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Görev Başlığı */}
        <div className="md:col-span-6">
          <label className="block text-[10px] font-medium text-vercel-text-muted uppercase tracking-wider mb-1.5 pl-0.5">
            Görev Başlığı
          </label>
          <input
            type="text"
            placeholder="Yapılacak işi detaylandırın..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="input-premium h-9" // Yükseklik Vercel standardı 36px (h-9) olarak eşitlendi
          />
        </div>

        {/* Sorumlu Kişi */}
        <div className="md:col-span-4">
          <label className="block text-[10px] font-medium text-vercel-text-muted uppercase tracking-wider mb-1.5 pl-0.5">
            Sorumlu Kişi
          </label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isSubmitting}
            className="input-premium h-9 cursor-pointer" // Yükseklik 36px
          >
            <option value="">Seçiniz...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Görevi Ata Butonu */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full h-9 text-xs font-medium flex justify-center items-center cursor-pointer" // Yükseklik 36px, font text-xs ve medium yapıldı
          >
            {isSubmitting ? (
              <div className="spinner-premium rounded-full h-4 w-4 border-white/30 border-t-white" />
            ) : (
              'Görevi Ata'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateTaskForm;
