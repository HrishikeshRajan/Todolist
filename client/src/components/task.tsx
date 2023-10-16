/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseDecksURI } from '../utils/constants';
import { useContext, useEffect, useState } from 'react';
import creatContext from '../utils/creatContext';

interface ItemProps {
  task: string;
  id: string;
  status: string;
}

const Task = ({ task, id, status }: ItemProps) => {
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [updatedTask, setUpdatedTask] = useState<any>([]);
  const taskContext = useContext(creatContext);

  const handleDelete = (id: string) => {
    fetch(BaseDecksURI + '/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => setTaskIdToDelete(result._id))
      .catch((e: React.ErrorInfo) => {
        console.log(e);
      });
  };

  const handleDone = (id: string) => {
    fetch(BaseDecksURI + '/' + id + '/' + 'status', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((result) => {
        setUpdatedTask(result);
      })
      .catch((e: React.ErrorInfo) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (taskIdToDelete) {
      taskContext.setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskIdToDelete),
      );
    }
  }, [taskIdToDelete]);

  useEffect(() => {
    if (updatedTask) {
      taskContext.setTasks((prevTasks) => [
        ...prevTasks.filter((task) => task._id !== updatedTask._id),
        updatedTask,
      ]);
    }
  }, [updatedTask]);

  if (task === undefined || id === undefined || status === undefined) return;
  return (
    <li
      key={id}
      className={`p-3  my-3 rounded flex justify-between w-full  font-bold text-slate-600 text-left ${
        status ? 'bg-green-200' : 'bg-slate-200'
      }`}
    >
      <p className="w-full flex items-center">{task}</p>
  
      <span className="w-full  flex justify-end  ">
        <button
          onClick={() => handleDone(id)}
          className="p-2 mx-1 bg-green-400 text-white rounded active:scale-95 shadow-md active:shadow-none"
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="p-2  mx-1 rounded bg-red-400 text-white active:scale-95 active:shadow-none shadow-md"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </li>
  );
};

export default Task;
