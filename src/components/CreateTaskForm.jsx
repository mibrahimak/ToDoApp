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
      className='premium-card premium-card--elevated p-5 sm:p-6 mb-6'
    >
      <div className='flex items-center gap-2 mb-5'>
        <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-sm font-bold'>
          +
        </span>
        <h3 className='text-sm font-bold text-slate-800 uppercase tracking-wider'>
          Yeni Takım Görevi
        </h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-end'>
        <div className='md:col-span-6'>
          <label className='block text-xs font-semibold text-slate-500 mb-1.5 pl-0.5'>
            Görev Başlığı
          </label>
          <input
            type='text'
            placeholder='Yapılacak işi detaylandırın...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className='input-premium'
          />
        </div>

        <div className='md:col-span-4'>
          <label className='block text-xs font-semibold text-slate-500 mb-1.5 pl-0.5'>
            Sorumlu Kişi
          </label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isSubmitting}
            className='input-premium'
          >
            <option value=''>Seçiniz...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className='md:col-span-2'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn-primary w-full py-2.5 px-4 text-sm flex justify-center items-center min-h-[2.5rem]'
          >
            {isSubmitting ? (
              <div className='spinner-premium rounded-full h-4 w-4 border-white/30 border-t-white' />
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
