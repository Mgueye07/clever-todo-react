// Type definition for a task in the to-do list
export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// Filter options for displaying tasks
export type FilterType = 'all' | 'active' | 'completed';
