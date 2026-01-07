'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiLoader, FiX, FiCheck } from 'react-icons/fi';
import { Task } from '@/types/task';

// Mock data for tasks
const initialTasks: Task[] = [
  { id: '1', title: 'Complete project proposal', description: 'Finish the project proposal document', completed: false, dueDate: '2023-06-15', priority: 'high' },
  { id: '2', title: 'Team meeting', description: 'Weekly team sync', completed: true, dueDate: '2023-06-10', priority: 'medium' },
  { id: '3', title: 'Review pull requests', description: 'Review and merge pending PRs', completed: false, dueDate: '2023-06-12', priority: 'high' },
  { id: '4', title: 'Update documentation', description: 'Update API documentation', completed: false, dueDate: '2023-06-20', priority: 'low' },
  { id: '5', title: 'Prepare presentation', description: 'Prepare slides for client meeting', completed: false, dueDate: '2023-06-18', priority: 'medium' },
];

export default function TasksPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Get username from localStorage or API
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
    
    // Simulate fetching tasks
    setTimeout(() => {
      setTasks(initialTasks);
      setFilteredTasks(initialTasks);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Filter tasks based on search term, status, and priority
    let result = tasks;
    
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(task => 
        filterStatus === 'active' ? !task.completed : task.completed
      );
    }
    
    if (filterPriority !== 'all') {
      result = result.filter(task => task.priority === filterPriority);
    }
    
    setFilteredTasks(result);
  }, [searchTerm, filterStatus, filterPriority, tasks]);

  const handleAddTask = () => {
    setCurrentTask({
      id: '',
      title: '',
      description: '',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium'
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleSaveTask = () => {
    if (!currentTask) return;
    
    if (isEditing) {
      // Update existing task
      setTasks(tasks.map(task => task.id === currentTask.id ? currentTask : task));
    } else {
      // Add new task
      const newTask = {
        ...currentTask,
        id: `task-${Date.now()}` // In a real app, this would come from the backend
      };
      setTasks([...tasks, newTask]);
    }
    
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Layout username={username || undefined}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={handleAddTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg" role="region" aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="sr-only">Tasks List</h2>
          {loading ? (
            <div className="p-12 flex justify-center" role="status" aria-live="polite">
              <FiLoader className="h-8 w-8 animate-spin text-indigo-600" aria-hidden="true" />
              <span className="sr-only">Loading tasks...</span>
            </div>
          ) : filteredTasks.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <li key={task.id} className="focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 rounded">
                  <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center">
                      <input
                        type="checkbox"
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-1 sm:mt-0"
                        aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`ml-4 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'} cursor-pointer`}
                      >
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500 mt-1 sm:hidden">{task.description}</p>
                      </label>
                      <div className="hidden sm:block ml-4">
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start sm:space-x-4 w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-500 sm:hidden">Due: {task.dueDate}</span>
                        <span className="hidden sm:block text-sm text-gray-500">{task.dueDate}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
                          aria-label={`Edit task: ${task.title}`}
                        >
                          <FiEdit2 className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
                          aria-label={`Delete task: ${task.title}`}
                        >
                          <FiTrash2 className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-500">No tasks found</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {showModal && currentTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between p-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {isEditing ? 'Edit Task' : 'Add New Task'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={currentTask.title}
                      onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={currentTask.description}
                      onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={currentTask.dueDate}
                        onChange={(e) => setCurrentTask({...currentTask, dueDate: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={currentTask.priority}
                        onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value as any})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="completed"
                      checked={currentTask.completed}
                      onChange={(e) => setCurrentTask({...currentTask, completed: e.target.checked})}
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                      Mark as completed
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTask}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isEditing ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}