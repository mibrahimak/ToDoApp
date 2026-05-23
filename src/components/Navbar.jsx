import React from 'react';

function Navbar() {
  return (
    <nav className='glass-nav relative text-white'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center justify-between'>
        <div className='flex items-center gap-3.5'>
          <div className='logo-mark w-10 h-10 rounded-xl flex items-center justify-center text-lg'>
            <span aria-hidden='true'>✦</span>
          </div>
          <div>
            <span className='font-bold text-[0.95rem] tracking-tight block leading-tight'>
              Takım Görev Uygulaması
            </span>
            <span className='text-[10px] text-indigo-200/70 font-medium block mt-0.5 tracking-wide uppercase'>
              Görev Yönetim Sistemi
            </span>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-right hidden sm:block'>
            <span className='text-xs font-semibold text-white/90 block'>
              Geliştirici Paneli
            </span>
            <span className='text-[10px] text-emerald-300 font-bold block online-pulse'>
              ● Çevrimiçi
            </span>
          </div>
          <div className='w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm text-white/95 backdrop-blur-sm ring-2 ring-indigo-400/30'>
            DEV
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
