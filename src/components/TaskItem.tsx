import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * TaskItem Component
 * Displays a single task with options to edit, delete, and mark as completed
 * Completed tasks are visually distinguished with strikethrough and opacity
 */
export const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) => {
  return (
    <Card 
      className={`p-4 shadow-card transition-smooth hover:shadow-hover ${
        task.completed ? 'bg-success-light border-success/20' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center pt-1">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 
            className={`font-semibold text-lg mb-1 transition-smooth ${
              task.completed ? 'line-through opacity-60' : ''
            }`}
          >
            {task.name}
          </h3>
          <p 
            className={`text-sm text-muted-foreground transition-smooth ${
              task.completed ? 'line-through opacity-50' : ''
            }`}
          >
            {task.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(task)}
            disabled={task.completed}
            className="transition-smooth"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="transition-smooth hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
