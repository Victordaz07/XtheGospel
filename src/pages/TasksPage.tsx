import React, { useState, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';
import { TasksService, Task } from '../services/tasksService';
import './Page.css';

const TasksPage: React.FC = () => {
  const { t } = useI18n();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await TasksService.loadTasks();
    setTasks(loadedTasks);
  };

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    await TasksService.saveTasks(updatedTasks);
    setTasks(updatedTasks);
    setNewTaskText('');
  };

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await TasksService.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    await TasksService.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('tasks.title')}</h1>
      </div>
      <div className="page-content">
        <div className="task-input">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder={t('tasks.newTask')}
            className="task-input-field"
          />
          <button onClick={addTask} className="task-add-button">{t('tasks.add')}</button>
        </div>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className="task-text">{task.text}</span>
              <button onClick={() => deleteTask(task.id)} className="task-delete">🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

