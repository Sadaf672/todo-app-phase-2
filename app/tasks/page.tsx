// app/tasks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { apiService, Todo, CreateTodoData } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'title'>('newest');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await apiService.getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (data: CreateTodoData) => {
    try {
      const newTodo = await apiService.createTodo(data);
      setTodos([newTodo, ...todos]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      const updatedTodo = await apiService.updateTodo(id, data);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await handleUpdateTodo(id, { completed: !todo.completed });
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Sort todos based on selected sort option
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === 'newest') {
      // Assuming createdAt exists on Todo objects
      return new Date(b.createdAt || b.id).getTime() - new Date(a.createdAt || a.id).getTime();
    } else if (sort === 'oldest') {
      return new Date(a.createdAt || a.id).getTime() - new Date(b.createdAt || b.id).getTime();
    } else if (sort === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <ProtectedRoute>
      <Layout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">All Tasks</h1>
          <p className="text-text-secondary mt-2">Manage all your tasks in one place</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-text-primary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  filter === 'active'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-text-primary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  filter === 'completed'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-text-primary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                Completed
              </button>
            </div>

            <div className="flex items-center space-x-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
              <span className="text-text-secondary text-sm">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as 'newest' | 'oldest' | 'title')}
                className="bg-surface border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingTodo(null);
              setShowForm(true);
            }}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <TaskForm
              initialData={editingTodo || undefined}
              onSubmit={editingTodo ?
                (data) => handleUpdateTodo(editingTodo.id, data) :
                handleCreateTodo
              }
              onCancel={cancelEditing}
            />
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-surface rounded-lg shadow p-4 flex items-start animate-pulse"
              >
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedTodos.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-text-primary mb-2">
              {filter === 'completed'
                ? 'No completed tasks yet'
                : filter === 'active'
                  ? 'No active tasks'
                  : 'No tasks yet'}
            </h3>
            <p className="text-text-secondary">
              {filter === 'completed'
                ? 'Complete some tasks to see them here'
                : filter === 'active'
                  ? 'Great! You have no active tasks'
                  : 'Get started by creating your first task'}
            </p>
            {filter !== 'completed' && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-200 flex items-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Task
              </button>
            )}
          </div>
        ) : (
          <TaskList
            tasks={sortedTodos}
            onToggleComplete={handleToggleComplete}
            onEdit={startEditing}
            onDelete={handleDeleteTodo}
            isLoading={loading}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}