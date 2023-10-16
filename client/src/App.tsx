/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import  taskContext from './utils/creatContext';
import { BaseDecksURI } from './utils/constants';
import { TaskItem } from './types';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  useEffect(() => {
    fetch(BaseDecksURI)
      .then((result) => result.json())
      .then((result: any[]) => {
        return setTasks([...tasks,...result]);
      })
      .catch((e: React.ErrorInfo) => {
        console.log(e);
      });
  }, []);
  return (
    <taskContext.Provider value={{tasks:tasks, setTasks}}>
      <div>
        <TodoList />
      </div>
    </taskContext.Provider>
  );
}

export default App;
