import { useState } from 'react';
import { Task, FilterType } from '@/types/task';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { ListTodo, CheckCircle2, Circle, List } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Index Page - Main To-Do List Application
 * Manages task state, localStorage persistence, and user interactions
 */
const Index = () => {
  // State management with localStorage persistence
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  // Add a new task or update existing task
  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
      toast.success('Task added successfully!');
    }
  };

  // Toggle task completion status
  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast.success(task.completed ? 'Task marked as active' : 'Task completed! 🎉');
    }
  };

  // Set task for editing
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (id: string) => {
    setDeletingTaskId(id);
  };

  // Confirm and delete task
  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      setTasks(tasks.filter(task => task.id !== deletingTaskId));
      setDeletingTaskId(null);
      toast.success('Task deleted successfully');
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Calculate task statistics
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground py-8 mb-8 shadow-lg">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ListTodo className="w-8 h-8" />
            <h1 className="text-4xl font-bold">My To-Do List</h1>
          </div>
          <p className="text-center text-primary-foreground/90">
            Stay organized and productive
          </p>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 pb-12">
        {/* Task Form */}
        <div className="mb-8">
          <TaskForm 
            onSubmit={handleSubmitTask}
            editingTask={editingTask}
            onCancel={handleCancelEdit}
          />
        </div>

        {/* Statistics and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Active:</span>
              <span className="font-semibold">{activeCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-semibold">{completedCount}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'gradient-primary' : ''}
            >
              <List className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'gradient-primary' : ''}
            >
              <Circle className="w-4 h-4 mr-2" />
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'gradient-success' : ''}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed
            </Button>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deletingTaskId !== null}
        onOpenChange={(open) => !open && setDeletingTaskId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default Index;
