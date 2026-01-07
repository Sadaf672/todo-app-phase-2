// // app/dashboard/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { apiService, Todo, CreateTodoData } from '@/lib/api';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import Layout from '@/components/Layout';
// import TaskList from '@/components/TaskList';
// import TaskForm from '@/components/TaskForm';
// import { useUser } from '@/lib/user-context';

// export default function DashboardPage() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
//   const { state: userState } = useUser();

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       setLoading(true);
//       const fetchedTodos = await apiService.getTodos();
//       setTodos(fetchedTodos);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateTodo = async (data: CreateTodoData) => {
//     try {
//       const newTodo = await apiService.createTodo(data);
//       setTodos([newTodo, ...todos]);
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error creating todo:', error);
//     }
//   };

//   const handleUpdateTodo = async (id: string, data: Partial<Todo>) => {
//     try {
//       const updatedTodo = await apiService.updateTodo(id, data);
//       setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
//       setEditingTodo(null);
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   };

//   const handleDeleteTodo = async (id: string) => {
//     try {
//       await apiService.deleteTodo(id);
//       setTodos(todos.filter(todo => todo.id !== id));
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   const handleToggleComplete = async (id: string) => {
//     const todo = todos.find(t => t.id === id);
//     if (todo) {
//       await handleUpdateTodo(id, { completed: !todo.completed });
//     }
//   };

//   const startEditing = (todo: Todo) => {
//     setEditingTodo(todo);
//     setShowForm(true);
//   };

//   const cancelEditing = () => {
//     setEditingTodo(null);
//     setShowForm(false);
//   };

//   // Calculate summary statistics
//   const totalTasks = todos.length;
//   const completedTasks = todos.filter(todo => todo.completed).length;
//   const pendingTasks = totalTasks - completedTasks;

//   return (
//     <ProtectedRoute>
//       <Layout>
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
//           <p className="text-text-secondary mt-2">
//             Welcome back, {userState.user?.name || userState.user?.email || 'there'}! Manage your tasks efficiently.
//           </p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-surface rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-2xl font-bold text-text-primary">{totalTasks}</h3>
//                 <p className="text-text-secondary">Total Tasks</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-surface rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-lg bg-success/10 text-success">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-2xl font-bold text-text-primary">{completedTasks}</h3>
//                 <p className="text-text-secondary">Completed</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-surface rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-lg bg-warning/10 text-warning">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-2xl font-bold text-text-primary">{pendingTasks}</h3>
//                 <p className="text-text-secondary">Pending</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-text-primary">Your Tasks</h2>
//           <button
//             onClick={() => {
//               setEditingTodo(null);
//               setShowForm(true);
//             }}
//             className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-200 flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add New Task
//           </button>
//         </div>

//         {showForm && (
//           <div className="mb-6">
//             <TaskForm
//               initialData={editingTodo || undefined}
//               onSubmit={editingTodo ?
//                 (data) => handleUpdateTodo(editingTodo.id, data) :
//                 handleCreateTodo
//               }
//               onCancel={cancelEditing}
//             />
//           </div>
//         )}

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(3)].map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-surface rounded-lg shadow p-4 flex items-start animate-pulse"
//               >
//                 <div className="flex-1">
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
//                   <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : todos.length === 0 ? (
//           <div className="text-center py-12">
//             <h3 className="text-xl font-medium text-text-primary mb-2">No tasks yet</h3>
//             <p className="text-text-secondary mb-4">Get started by creating your first task</p>
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-200 flex items-center mx-auto"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Create Task
//             </button>
//           </div>
//         ) : (
//           <TaskList
//             tasks={todos}
//             onToggleComplete={handleToggleComplete}
//             onEdit={startEditing}
//             onDelete={handleDeleteTodo}
//             isLoading={loading}
//           />
//         )}
//       </Layout>
//     </ProtectedRoute>
//   );
// }


'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: 40 }}>
        <h1>Dashboard Working ✅</h1>
        <p>If you can see this, routing + auth is OK.</p>
      </div>
    </ProtectedRoute>
  )
}
