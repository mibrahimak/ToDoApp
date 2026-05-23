import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verileri Yükleme (Local Storage Kontrollü)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Önce local storage'da kayıtlı görev var mı bak
        const localTasks = localStorage.getItem('persona_tasks');
        const localUsers = localStorage.getItem('persona_users');

        if (localTasks && localUsers) {
          // Varsa doğrudan hafızadan oku (API'ye gitme)
          setTasks(JSON.parse(localTasks));
          setUsers(JSON.parse(localUsers));
        } else {
          // Yoksa API'den çek ve hafızaya kaydet
          const [tasksData, usersData] = await Promise.all([
            api.getTasks(),
            api.getUsers(),
          ]);
          setTasks(tasksData);
          setUsers(usersData);
          localStorage.setItem('persona_tasks', JSON.stringify(tasksData));
          localStorage.setItem('persona_users', JSON.stringify(usersData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // State her değiştiğinde Local Storage'ı güncelle (useEffect takibi)
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('persona_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Durum Değiştirme
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Görev Ekleme
  const addTask = async (title, userId) => {
    try {
      setIsSubmitting(true);
      const newBackendTask = await api.createTask({ title, userId });
      const uniqueTask = { ...newBackendTask, id: Date.now() };
      setTasks((prevTasks) => [uniqueTask, ...prevTasks]);
    } catch (err) {
      alert(`Görev eklenirken hata: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Görev Silme Fonksiyonu
  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      'Bu görevi silmek istediğinize emin misiniz?'
    );
    if (!confirmDelete) return;

    try {
      // API'ye silme isteği gönder
      await api.deleteTask(taskId);
      // Yerel state'den bu görevi filtreleyerek kaldır
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      // Eğer hiç görev kalmadıysa hafızayı temizle (boş dizi olarak kalmasın)
      if (updatedTasks.length === 0) {
        localStorage.removeItem('persona_tasks');
      }
    } catch (err) {
      alert(`Görev silinirken bir hata oluştu: ${err.message}`);
    }
  };

  // Hafızayı Sıfırlama Fonksiyonu
  const resetStorage = () => {
    const confirmReset = window.confirm(
      'Tüm yerel veriler silinecek ve orijinal API verileri yüklenecek. Emin misiniz?'
    );
    if (!confirmReset) return;

    localStorage.removeItem('persona_tasks');
    localStorage.removeItem('persona_users');
    // Sayfayı yenileyerek useEffect'in verileri API'den sıfırdan çekmesini sağlıyoruz
    window.location.reload();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesUser =
      selectedUser === 'all' || task.userId === parseInt(selectedUser);
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'completed' && task.completed) ||
      (selectedStatus === 'pending' && !task.completed);
    return matchesUser && matchesStatus;
  });

  return {
    tasks: filteredTasks,
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
  };
};
