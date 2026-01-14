'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Select } from '@/components/Select';
import { Task, TaskCreate, TaskUpdate } from '@/types/task';
import { taskApi } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sort, setSort] = useState<'created' | 'title'>('created');
  const [currentUser, setCurrentUser] = useState({
    name: 'Demo User',
    email: 'demo@example.com'
  });

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // Redirect to login if no token found
      router.push('/login');
      return;
    }
    // TODO: Verify token validity by calling an API endpoint if needed
  }, [router]);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskApi.getTasks(filter, sort);
        setTasks(tasks);
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter, sort]);

  const handleCreateTask = async (taskData: TaskCreate) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks([...tasks, newTask]);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (!editingTask) return;

    try {
      const updatedTask = await taskApi.updateTask(editingTask.id, taskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
      setEditingTask(null);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await taskApi.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    try {
      const updatedTask = await taskApi.toggleTaskCompletion(taskId);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err: any) {
      setError(err.message || 'Failed to toggle task completion');
      console.error('Error toggling task completion:', err);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleLogout = async () => {
    try {
      // Call the backend logout API
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/sign-out`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      // Clear auth token from localStorage
      localStorage.removeItem('auth_token');
      router.push('/login');
    }
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'title') {
      return a.title.localeCompare(b.title);
    } else { // 'created'
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          <p className="text-gray-600 mt-2">Fetching your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Task
              </button>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <Select
                  label="Filter by Status"
                  value={filter}
                  onChange={(value: 'all' | 'pending' | 'completed') => setFilter(value)}
                  options={[
                    { value: 'all', label: 'All Tasks' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'completed', label: 'Completed' }
                  ]}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Select
                  label="Sort by"
                  value={sort}
                  onChange={(value: 'created' | 'title') => setSort(value)}
                  options={[
                    { value: 'created', label: 'Date Created' },
                    { value: 'title', label: 'Title' }
                  ]}
                />
              </div>
            </div>

            {showForm && (
              <div className="mb-6">
                <TaskForm
                  task={editingTask || undefined}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                />
              </div>
            )}

            <TaskList
              tasks={sortedTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
            />

            {sortedTasks.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No tasks found. Add your first task!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}