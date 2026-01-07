// components/AnimatedTaskItem.tsx
'use client';

import { motion } from 'framer-motion';
import TaskItem from './TaskItem';
import { Todo } from '@/lib/api';

interface AnimatedTaskItemProps {
  task: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Todo) => void;
  onDelete: (id: string) => void;
}

export default function AnimatedTaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete
}: AnimatedTaskItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <TaskItem
        task={task}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </motion.div>
  );
}