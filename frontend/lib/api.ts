// frontend/lib/api.ts
import { Task, TaskCreate, TaskUpdate } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Helper to get the JWT token from localStorage
const getAuthToken = (): string | null => {
  // Our custom auth stores the JWT token in localStorage under 'auth_token'
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Helper to create headers with Better Auth token
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Tasks API functions
export const taskApi = {
  // Get all tasks with optional filters
  getTasks: async (status?: 'all' | 'pending' | 'completed', sort?: 'created' | 'title'): Promise<Task[]> => {
    let url = `${API_BASE_URL}/api/tasks`;
    const params = new URLSearchParams();

    if (status && status !== 'all') {
      params.append('status', status);
    }

    if (sort) {
      params.append('sort', sort);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error - likely means token is invalid/expired
          // In a real app, this would trigger a logout
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}. ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData: TaskCreate): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        }
        const errorText = await response.text();
        throw new Error(`Failed to create task: ${response.status} ${response.statusText}. ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Get a single task by ID
  getTask: async (id: number): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        } else if (response.status === 404) {
          throw new Error('Task not found');
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch task: ${response.status} ${response.statusText}. ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (id: number, taskData: TaskUpdate): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        } else if (response.status === 404) {
          throw new Error('Task not found');
        }
        const errorText = await response.text();
        throw new Error(`Failed to update task: ${response.status} ${response.statusText}. ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        } else if (response.status === 404) {
          throw new Error('Task not found');
        }
        const errorText = await response.text();
        throw new Error(`Failed to delete task: ${response.status} ${response.statusText}. ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Toggle task completion status
  toggleTaskCompletion: async (id: number): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 error
          localStorage.removeItem('better-auth.session-token');
          window.location.href = '/login';
        } else if (response.status === 404) {
          throw new Error('Task not found');
        }
        const errorText = await response.text();
        throw new Error(`Failed to toggle task completion: ${response.status} ${response.statusText}. ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  },
};