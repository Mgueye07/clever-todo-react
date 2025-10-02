import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Task } from '@/types/task';
import { Plus, Save, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

/**
 * TaskForm Component
 * Handles adding new tasks and editing existing ones
 * Includes form validation for required fields
 */
export const TaskForm = ({ onSubmit, editingTask, onCancel }: TaskFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  // Populate form when editing a task
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  // Form validation function
  const validate = () => {
    const newErrors: { name?: string; description?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Task name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Task description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        name: name.trim(),
        description: description.trim(),
        completed: editingTask?.completed || false,
      });
      
      // Reset form if not editing
      if (!editingTask) {
        setName('');
        setDescription('');
      }
      setErrors({});
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setErrors({});
    onCancel?.();
  };

  return (
    <Card className="p-6 shadow-card transition-smooth hover:shadow-hover">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Task Name
          </Label>
          <Input
            id="name"
            placeholder="Enter task name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: undefined });
            }}
            className={errors.description ? 'border-destructive' : ''}
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            className="flex-1 gradient-primary transition-smooth"
          >
            {editingTask ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
          
          {editingTask && onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
