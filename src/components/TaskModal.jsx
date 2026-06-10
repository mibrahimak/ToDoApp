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
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-linear-to-b from-white to-slate-50/50 rounded-t-[1.25rem]">
          <div className="pr-4 min-w-0">
            <span
              className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2.5 ${
                task.completed
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/60'
                  : 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200/60'
              }`}
            >
              {task.completed ? 'Tamamlandı' : 'Devam ediyor'}
            </span>
            <h3
              id="task-modal-title"
              className="text-lg font-bold text-slate-900 leading-snug"
            >
              {task.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5">
              Sorumlu:{' '}
              <span className="font-semibold text-slate-600">
                {taskOwner ? taskOwner.name : 'Atanmamış'}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-colors shrink-0"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50/60 modal-scroll">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Görev yorumları ({comments.length})
          </h4>

          {isLoadingComments ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="spinner-premium rounded-full h-7 w-7" />
              <p className="text-xs text-slate-500 font-medium">
                Yorumlar yükleniyor...
              </p>
            </div>
          ) : commentError ? (
            <div className="text-xs text-red-600 text-center py-6 bg-red-50 border border-red-100 rounded-xl">
              Yorumlar alınamadı: {commentError}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-sm text-slate-400 text-center py-10 empty-state border-0 bg-transparent">
              Bu göreve henüz yorum yapılmamış.
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-bubble">
                  <div className="flex justify-between items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-700 truncate">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-indigo-400/90 font-medium shrink-0">
                      {comment.email.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:px-6 border-t border-slate-100 bg-white flex justify-end rounded-b-[1.25rem]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
