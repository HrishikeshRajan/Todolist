/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import '../App.css';
import { BaseDecksURI } from '../utils/constants';
import taskContext from '../utils/creatContext';

function AddTask() {
  const [title, setTitle] = useState('')
  const taskStore = useContext(taskContext);
  const createDeck = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(BaseDecksURI, {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setTitle('');
        return result.json();
      })
      .then((result) => taskStore.setTasks([result,...taskStore.tasks]))
      .catch((e: React.ErrorInfo) => {
        console.log(e);
      });
  };


  // useEffect(() => {
  //   fetch(BaseDecksURI)
  //     .then((result) => result.json())
  //     .then((result: any[]) => {
  //       return setDecks(result);
  //     })
  //     .catch((e: React.ErrorInfo) => {
  //       console.log(e);
  //     });
  // }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center px-10">
        <form
          onSubmit={createDeck}
          className=" rounded bg-slate-100  shadow-black p-4 flex flex-col w-2/3"
        >
          <h2 className="text-2xl font-extrabold text-slate-600 py-2">
            Todo List
          </h2>

          <input
            id="title"
            type="text"
            value={title}
            placeholder="Enter you tasks here"
            className="pl-4 py-5 rounded my-5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button className="p-5 bg-slate-500 text-white rounded font-bold">
            Add Task
          </button>
        </form>

   
      </div>
    </div>
  );
}

export default AddTask;
