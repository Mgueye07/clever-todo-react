# To-Do List Application

A modern, feature-rich To-Do List application built with React, TypeScript, and Tailwind CSS. This application demonstrates comprehensive state management, form validation, and persistent data storage using browser localStorage.

## Features

- ✨ **Add Tasks**: Create new tasks with name and description
- ✏️ **Edit Tasks**: Update existing task details
- 🗑️ **Delete Tasks**: Remove tasks with confirmation dialog
- ✅ **Mark Complete**: Toggle task completion status with visual feedback
- 🎯 **Filter Tasks**: View all, active, or completed tasks
- 💾 **Persistent Storage**: Tasks are saved to localStorage
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive**: Works perfectly on all device sizes
- ♿ **Accessible**: Built with accessibility in mind

## Technologies Used

- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Beautiful component library
- **Vite**: Fast build tool
- **localStorage**: Browser-based persistence

## Component Architecture

The application is structured with clean, reusable components:

- `TaskForm`: Handles task creation and editing with validation
- `TaskList`: Displays filtered list of tasks
- `TaskItem`: Individual task with edit/delete/complete actions
- `ConfirmDialog`: Reusable confirmation dialog for destructive actions
- `useLocalStorage`: Custom hook for state persistence

## Form Validation

The application includes comprehensive form validation:
- Task name is required
- Task description is required
- Real-time error messages
- Visual error indicators

## Data Persistence

Tasks are automatically saved to browser localStorage:
- Persists between browser sessions
- Automatic sync on every change
- No backend required

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding a Task
1. Fill in the task name and description fields
2. Click "Add Task" button
3. The task appears at the top of the list

### Editing a Task
1. Click the edit icon on any active task
2. The form will populate with the task details
3. Make your changes and click "Update Task"
4. Click the X button to cancel editing

### Completing a Task
1. Click the checkbox next to any task
2. The task will be visually marked as completed
3. Completed tasks show with strikethrough text

### Deleting a Task
1. Click the delete icon on any task
2. Confirm deletion in the dialog
3. The task is permanently removed

### Filtering Tasks
- **All**: Shows all tasks
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only completed tasks

## Design System

The application uses a custom design system with:
- Gradient primary colors (purple/blue)
- Success indicators (green)
- Smooth transitions and animations
- Card-based layout with shadows
- Semantic color tokens

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

Potential features for future versions:
- Task priorities
- Due dates and reminders
- Task categories/tags
- Search functionality
- Drag-and-drop reordering
- Dark mode toggle
- Export/import tasks

## License

This project is created for educational purposes.

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
