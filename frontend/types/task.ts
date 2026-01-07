// frontend/types/task.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}