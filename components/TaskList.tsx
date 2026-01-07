// components/TaskList.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import AnimatedTaskItem from './AnimatedTaskItem';
import { Todo } from '@/lib/api';

interface TaskListProps {
  tasks: Todo[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Todo) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl shadow p-5 flex items-start animate-pulse border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto bg-gray-100 dark:bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-text-primary mb-2">No tasks yet</h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Get started by creating your first task. Your tasks will appear here once you create them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence>
        {tasks.map((task) => (
          <AnimatedTaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}