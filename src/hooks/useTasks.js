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

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const localTasks = localStorage.getItem('persona_tasks');
        const localUsers = localStorage.getItem('persona_users');

        if (localTasks && localUsers) {
          setTasks(JSON.parse(localTasks));
          setUsers(JSON.parse(localUsers));
        } else {
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

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('persona_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

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

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      'Bu görevi silmek istediğinize emin misiniz?',
    );
    if (!confirmDelete) return;

    try {
      await api.deleteTask(taskId);

      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      if (updatedTasks.length === 0) {
        localStorage.removeItem('persona_tasks');
      }
    } catch (err) {
      alert(`Görev silinirken bir hata oluştu: ${err.message}`);
    }
  };

  const resetStorage = () => {
    const confirmReset = window.confirm(
      'Tüm yerel veriler silinecek ve orijinal API verileri yüklenecek. Emin misiniz?',
    );
    if (!confirmReset) return;

    localStorage.removeItem('persona_tasks');
    localStorage.removeItem('persona_users');

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
