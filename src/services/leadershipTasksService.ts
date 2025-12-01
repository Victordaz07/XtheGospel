// src/services/leadershipTasksService.ts
// Servicio para bandeja de tareas de líderes

const LEADERSHIP_TASKS_KEY = '@leadershipTasks';

export interface LeadershipTask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category?: string;
  assignedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export const LeadershipTasksService = {
  saveTask: (task: Omit<LeadershipTask, 'id' | 'createdAt' | 'updatedAt'>): LeadershipTask => {
    try {
      const tasks = LeadershipTasksService.loadAllTasks();
      const newTask: LeadershipTask = {
        ...task,
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.push(newTask);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADERSHIP_TASKS_KEY, JSON.stringify(tasks));
      }
      return newTask;
    } catch (e) {
      console.error('Error guardando tarea:', e);
      throw e;
    }
  },

  loadAllTasks: (): LeadershipTask[] => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const jsonTasks = localStorage.getItem(LEADERSHIP_TASKS_KEY);
        if (jsonTasks) {
          return JSON.parse(jsonTasks);
        }
      }
      return [];
    } catch (e) {
      console.error('Error cargando tareas:', e);
      return [];
    }
  },

  updateTask: (id: string, updates: Partial<LeadershipTask>): LeadershipTask | null => {
    try {
      const tasks = LeadershipTasksService.loadAllTasks();
      const index = tasks.findIndex(t => t.id === id);
      if (index === -1) return null;

      tasks[index] = {
        ...tasks[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADERSHIP_TASKS_KEY, JSON.stringify(tasks));
      }
      return tasks[index];
    } catch (e) {
      console.error('Error actualizando tarea:', e);
      throw e;
    }
  },

  deleteTask: (id: string): void => {
    try {
      const tasks = LeadershipTasksService.loadAllTasks();
      const filtered = tasks.filter(t => t.id !== id);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(LEADERSHIP_TASKS_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error('Error eliminando tarea:', e);
      throw e;
    }
  }
};

