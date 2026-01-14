'use client';

import { useState } from 'react';
import { TaskCreate, TaskUpdate } from '@/types/task';

interface TaskFormProps {
  task?: TaskUpdate;
  onSubmit: (data: TaskCreate | TaskUpdate) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setFormError(null);
    setIsSubmitting(true);

    if (!title.trim()) {
      setFormError('Title is required');
      setIsSubmitting(false);
      return;
    }

    if (title.length < 1 || title.length > 200) {
      setFormError('Title must be between 1 and 200 characters');
      setIsSubmitting(false);
      return;
    }

    if (description && description.length > 1000) {
      setFormError('Description must be less than 1000 characters');
      setIsSubmitting(false);
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: task?.completed || false, // Preserve completion status when editing
    };

    try {
      await onSubmit(taskData); // Call parent function (async)
    } catch (err: any) {
      setFormError(err.message || 'Failed to save task. Please try again.');
      console.error('Form submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {formError && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-medium">{formError}</p>
        </div>
      )}

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter task title"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add more details (optional)"
          disabled={isSubmitting}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}