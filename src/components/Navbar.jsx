import React, { useState, useEffect } from 'react';

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vercel_theme') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('vercel_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="glass-nav sticky top-0 z-40 bg-white border-b border-vercel-line transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Sol Taraf: Logo ve Başlık */}
        <div className="flex items-center gap-2.5">
          <div className="logo-mark w-7 h-7 rounded-vercel flex items-center justify-center text-xs font-bold bg-vercel-text-main text-white">
            M
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-xs text-vercel-text-main tracking-tight">
              Takım Görev Panosu
            </span>
          </div>
        </div>

        {/* Sağ Taraf: Eylemler */}
        <div className="flex items-center gap-4">
          {/* image_2.png Görselindeki Premium Animasyonlu Tema Toggle'ı */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative w-11 h-6 rounded-full border transition-colors duration-300 p-0.5 cursor-pointer flex items-center
              ${
                theme === 'dark'
                  ? 'bg-vercel-text-main border-vercel-line justify-end'
                  : 'bg-vercel-canvas border-vercel-line justify-start'
              }`}
            title={theme === 'light' ? 'Koyu Moda Geç' : 'Açık Moda Geç'}
          >
            {/* İçerideki Yuvarlak Kapsül (İkon Taşıyıcı) */}
            <div className="w-4.5 h-4.5 rounded-full bg-white dark:bg-vercel-bg shadow-sm flex items-center justify-center text-[10px] transition-all duration-300 transform select-none">
              {theme === 'light' ? '☀️' : '🌙'}
            </div>
          </button>

          {/* Profil Avatarı */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium bg-vercel-canvas text-vercel-text-muted border border-vercel-line px-2 py-1 rounded-full tracking-wider uppercase">
              Software Persona
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
