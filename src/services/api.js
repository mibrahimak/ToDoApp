const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  getTasks: async () => {
    const response = await fetch(`${BASE_URL}/todos?_limit=15`);
    if (!response.ok) throw new Error('Görevler sunucudan alınamadı.');
    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Takım üyeleri listesi alınamadı.');
    return response.json();
  },

  getCommentsByTaskId: async (taskId) => {
    const response = await fetch(`${BASE_URL}/comments?postId=${taskId}`);
    if (!response.ok) throw new Error('Yorumlar yüklenirken bir hata oluştu.');
    return response.json();
  },

  createTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: taskData.title,
        userId: parseInt(taskData.userId),
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error('Yeni görev sunucuda oluşturulamadı.');
    return response.json();
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`${BASE_URL}/todos/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Görev sunucudan silinemedi.');
    return true;
  },
};
