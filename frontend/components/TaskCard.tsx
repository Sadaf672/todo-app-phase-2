// frontend/components/TaskCard.tsx
import { Task } from '@/types/task';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSave = () => {
    onEdit({
      ...task,
      title,
      description: description || undefined
    });
    setIsEditing(false);
  };

  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${task.completed ? 'opacity-70' : ''}`}>
      <div className="px-4 py-5 sm:p-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Task title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Task description (optional)"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTitle(task.title);
                  setDescription(task.description || '');
                }}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded mt-1"
              />
              <div className="ml-3">
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-500'}`}>
                    {task.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  Created: {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};