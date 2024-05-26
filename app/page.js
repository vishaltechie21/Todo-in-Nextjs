"use client"
import React, { useState } from 'react';
import { signInWithPopup, signOut } from "./Firebase"; // Import the signOut function

const Page = () => {
  const [title, setTitle] = useState('');
  const [dis, setDis] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status

  const SubmitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, dis }]);
    setDis('');
    setTitle('');
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
    console.log(copyTask);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup();
      setIsLoggedIn(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    signOut(); // Call the signOut function
    setIsLoggedIn(false); // Update login status
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between w-2/3 px-2 py-4'>
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
        {isLoggedIn ? ( // Conditionally render login/logout button
          <button onClick={handleLogout} className='flex float-right mr-4 border-amber-50 border-2 text-center bg-slate-500'>Logout</button>
        ) : (
          <button onClick={handleLogin} className='flex float-right mr-4 border-amber-50 border-2 text-center bg-slate-500'>Login</button>
        )}
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
      <div className='text-center bg-red-200 py-4 m-2'>{renderTask}</div>
      <hr className='my-4 md:my-8' />

      {isLoggedIn && (
        <>
          <h5 className='float-right rounded-full mr-3 '>
             { <img   src={localStorage.getItem("photo")} />}
          </h5>
          <h5>{localStorage.getItem("name")}</h5>
          <h5>{localStorage.getItem("email")}</h5>
        </>
      )}
    </>
  );
};

export default Page;
