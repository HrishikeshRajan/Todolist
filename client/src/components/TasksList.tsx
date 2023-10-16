import { TaskItem } from '../types';
import Task from './task';

interface TaskProps {
  items: TaskItem[];
}
const TasksList = ({ items }: TaskProps) => {
  return (
    <div className='w-full p-10    flex justify-center'>
      <ul className=' w-2/3 h-60 overflow-y-auto rounded    px-4'>
        {items.map((task,index) => (
          <Task task={task.title} status={task.status} id={task._id} key={index}  />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
