import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StorageService, Task } from '../src/services/storage';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await StorageService.loadTasks();
    setTasks(loadedTasks);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      };
      const updatedTasks = [...tasks, newTaskItem];
      await StorageService.saveTasks(updatedTasks);
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const toggleTask = async (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    );
    await StorageService.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteTask = async (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await StorageService.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        📝 Lista de Tareas
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          placeholder="Escribe una nueva tarea..."
          value={newTask}
          onChangeText={setNewTask}
          style={{ 
            flex: 1, 
            borderWidth: 1, 
            padding: 10, 
            marginRight: 10,
            borderRadius: 5 
          }}
        />
        <Button title="➕" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 5,
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 5
          }}>
            <TouchableOpacity 
              onPress={() => toggleTask(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                  color: item.completed ? '#888' : '#000',
                  fontSize: 16
                }}
              >
                {item.completed ? '✅ ' : '⭕ '}{item.text}
              </Text>
            </TouchableOpacity>
            <Button 
              title="🗑️" 
              onPress={() => deleteTask(item.id)} 
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
}