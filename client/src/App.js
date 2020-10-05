import React, { Fragment, useState, useEffect } from 'react';

import './App.css';
import MainPage from './components/MainPage/MainPage';
function App() {
//   const [count, setCount] = useState(0);

// useEffect(()=>{
//   document.title = `You clicked ${count} times`;
//   console.log('updated')
// },[count])

  return (
    <div className="container m-5">
      <MainPage />
      {/* <h1>Hello</h1>
      <p>You clicked on button {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click!</button> */}
    </div>
  );
}

export default App;
