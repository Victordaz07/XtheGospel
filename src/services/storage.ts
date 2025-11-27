// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const StorageService = {
  // Guardar todas las tareas
  saveTasks: async (tasks: Task[]) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem(TASKS_KEY, jsonTasks);
    } catch (e) {
      console.error('Error guardando tareas:', e);
      throw e;
    }
  },

  // Cargar todas las tareas
  loadTasks: async (): Promise<Task[]> => {
    try {
      const jsonTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (jsonTasks) {
        const tasks = JSON.parse(jsonTasks);
        // Convertir string dates a Date objects
        return tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
      }
      return [];
    } catch (e) {
      console.error('Error cargando tareas:', e);
      return [];
    }
  },

  // Limpiar todas las tareas
  clearTasks: async () => {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
    } catch (e) {
      console.error('Error limpiando tareas:', e);
      throw e;
    }
  }
};