import AddTask from './AddTask';
import TasksList from './TasksList';
import taskContext from '../utils/creatContext';
import { useContext } from 'react';

const TodoList = () => {
  const taskStore = useContext(taskContext);
  return (
    <div className='flex justify-center flex-col relative'>
      <AddTask />
      {taskStore.tasks.length > 0 && <TasksList items ={taskStore.tasks} />}
    </div>
  );
};

export default TodoList;
