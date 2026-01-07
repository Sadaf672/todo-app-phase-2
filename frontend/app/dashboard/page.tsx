'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FiPlus, FiCheck, FiClock, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { Task } from '@/types/task';

// Mock data for dashboard cards
const overviewData = [
  { title: 'Pending Tasks', value: 12, icon: FiClock, color: 'bg-blue-500' },
  { title: 'Completed Tasks', value: 24, icon: FiCheck, color: 'bg-green-500' },
  { title: 'Overdue Tasks', value: 3, icon: FiAlertCircle, color: 'bg-red-500' },
];

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get username from localStorage or API
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
    
    // Simulate fetching tasks
    setTimeout(() => {
      // In a real app, this would be an API call
      const mockTasks: Task[] = [
        { id: '1', title: 'Complete project proposal', description: 'Finish the project proposal document', completed: false, dueDate: '2023-06-15', priority: 'high' },
        { id: '2', title: 'Team meeting', description: 'Weekly team sync', completed: true, dueDate: '2023-06-10', priority: 'medium' },
        { id: '3', title: 'Review pull requests', description: 'Review and merge pending PRs', completed: false, dueDate: '2023-06-12', priority: 'high' },
      ];
      setTasks(mockTasks);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <Layout username={username || undefined}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Link 
            href="/tasks" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            View All Tasks
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {overviewData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.title}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Tasks</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your most recent tasks</p>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 flex justify-center">
                <FiLoader className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : tasks.length > 0 ? (
              tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <span className={`ml-3 text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-sm text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">No recent tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}