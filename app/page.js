"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [dis, setDis] = useState('');
  const [mainTask, setMainTask] = useState([]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, dis }]);
    setDis('');
    setTitle('');
    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
    console.log(copyTask);
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between w-2/3'>
            <h5 className='mb-3'>Your Task: {t.title} </h5>
            <h5>Your Description: {t.dis}</h5>
          </div>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className='font-mono bg-red-400 rounded px-4 py-2 text-white'>
            Delete
          </button>
        </li>
      );
    });
  }
  return (
    <>
      <div className='bg-slate-400 font-mono font-bold text-center text-xl py-4 md:py-8'>
        Todo List
      </div>

      <form
        onSubmit={SubmitHandler}
        className='md:flex flex-wrap items-center justify-between px-4'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-4 bg-red-100 my-2 md:mx-2 px-3 py-4 w-full md:w-auto'
          placeholder='Add Task..'
        />
        <input
          type='text'
          value={dis}
          onChange={(e) => setDis(e.target.value)}
          className='border-4 bg-red-100 my-2 md:mx-2 px-3 py-4 w-full md:w-auto'
          placeholder='Description..'
        />
        <button
          type='submit'
          className='bg-black px-3 py-4 rounded text-white font-sans font-bold w-full md:w-auto mt-2 md:mt-0'>
          Add Task
        </button>
      </form>

      <hr className='my-4 md:my-8' />
      <div className='text-center bg-red-200 py-4'>{renderTask}</div>
    </>
  );
};

export default Page;
