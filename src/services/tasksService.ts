import { StorageService } from '../utils/storage';

const TASKS_KEY = '@tasks';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const TasksService = {
  // Guardar todas las tareas
  saveTasks: async (tasks: Task[]): Promise<void> => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      StorageService.setItem(TASKS_KEY, jsonTasks);
    } catch (e) {
      console.error('Error guardando tareas:', e);
      throw e;
    }
  },

  // Cargar todas las tareas
  loadTasks: async (): Promise<Task[]> => {
    try {
      const jsonTasks = StorageService.getItem(TASKS_KEY);
      if (jsonTasks) {
        const tasks = JSON.parse(jsonTasks);
        return tasks;
      }
      return [];
    } catch (e) {
      console.error('Error cargando tareas:', e);
      return [];
    }
  },

  // Limpiar todas las tareas
  clearTasks: async (): Promise<void> => {
    try {
      StorageService.removeItem(TASKS_KEY);
    } catch (e) {
      console.error('Error limpiando tareas:', e);
      throw e;
    }
  }
};

