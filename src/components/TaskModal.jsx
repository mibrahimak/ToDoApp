import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function TaskModal({ task, users, onClose }) {
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState(null);

  const taskOwner = users.find((user) => user.id === task.userId);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoadingComments(true);
        setCommentError(null);
        const data = await api.getCommentsByTaskId(task.id);
        setComments(data);
      } catch (err) {
        setCommentError(err.message);
      } finally {
        setIsLoadingComments(false);
      }
    };

    if (task?.id) {
      fetchComments();
    }
  }, [task?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="modal-panel w-full max-w-xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Üst Alan - Tamamen Beyaz ve Keskin Köşeli */}
        <div className="p-6 border-b border-vercel-line flex items-start justify-between bg-white rounded-t-vercel">
          <div className="pr-4 min-w-0">
            {/* Vercel Tarzı Minimal Durum Badge'i */}
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 border rounded-md mb-3 bg-vercel-canvas text-vercel-text-main
                ${task.completed ? 'border-vercel-line' : 'border-vercel-line'}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full 
                  ${task.completed ? 'bg-[#0070f3]' : 'bg-[#f5a623]'}`}
              />
              {task.completed ? 'Tamamlandı' : 'Devam ediyor'}
            </span>

            <h3
              id="task-modal-title"
              className="text-base font-semibold text-vercel-text-main tracking-tight leading-snug"
            >
              {task.title}
            </h3>
            <p className="text-xs text-vercel-text-muted mt-1.5">
              Sorumlu:{' '}
              <span className="font-medium text-vercel-text-main">
                {taskOwner ? taskOwner.name : 'Atanmamış'}
              </span>
            </p>
          </div>

          {/* İnce ve Şık Kapatma Butonu */}
          <button
            type="button"
            onClick={onClose}
            className="text-vercel-text-muted hover:text-vercel-text-main hover:bg-vercel-canvas p-1.5 rounded-vercel transition-colors shrink-0 cursor-pointer text-sm"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        {/* Orta Yorum Alanı */}
        <div className="p-6 overflow-y-auto flex-1 bg-white modal-scroll">
          <h4 className="text-[11px] font-medium text-vercel-text-muted uppercase tracking-wider mb-4">
            Görev yorumları ({comments.length})
          </h4>

          {isLoadingComments ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="spinner-premium rounded-full h-6 w-6" />
              <p className="text-xs text-vercel-text-muted">
                Yorumlar yükleniyor...
              </p>
            </div>
          ) : commentError ? (
            <div className="text-xs text-vercel-danger text-center py-4 bg-vercel-danger/5 border border-vercel-danger/10 rounded-vercel">
              Yorumlar alınamadı: {commentError}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-sm text-vercel-text-muted text-center py-12 border border-dashed border-vercel-line rounded-vercel">
              Bu göreve henüz yorum yapılmamış.
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-bubble">
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="text-xs font-medium text-vercel-text-main truncate">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-vercel-text-muted font-normal shrink-0">
                      {comment.email.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-xs text-vercel-text-muted leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alt Alan - Kapat Butonu Vercel Stilinde */}
        <div className="p-4 px-6 border-t border-vercel-line bg-vercel-canvas flex justify-end rounded-b-vercel">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-vercel-canvas text-vercel-text-main font-medium text-xs border border-vercel-line rounded-vercel transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
