/*import React, { useState, useMemo,useEffect } from "react";
const expensiveCalculation = (num: number) => {

  
  console.log("Performing expensive calculation start...");
  for (let i = 0; i < 10000000000; i++) {
    num += 1;
  }
  console.log("Performing expensive calculation end...");
  return num;
};
export function DemoUseMemo() {
  
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");



  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);
  useEffect(() => {
     console.log("Component mounted");
    }, []);
  return (
     <div>
      <h1>useMemo Demo</h1>

    
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setCount(count - 1)}>Decrement Count</button>

   
      <p>Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

      
      <p>Expensive Calculation Result: {memoizedValue}</p>
    </div>
  );
}
  */

import React, { useState, useMemo, useEffect } from 'react';

// A simulated expensive calculation function
const expensiveCalculation = (num:number) => {
  console.log('START - Performing expensive calculation...');
  for (let i = 0; i < 10000000000; i++) {
    num += 1;
  }
  console.log('END - Performing expensive calculation...');
  document.getElementById("dResult")!.innerHTML="Expensive Calculation Result: "+num;
  return num;
};

function DemoUseMemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the result of expensiveCalculation based on 'count'
  //const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  // If we DON'T use useMemo, the expensiveCalculation would run on every render,
  // even when 'text' changes, causing performance issues.
  // comment line no 64 code. const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);  and uncomment below line to see the difference.
  //const nonMemoizedValue = expensiveCalculation(count); // This would be inefficient
  const memoizedValue = useEffect(() => {
    setTimeout(() => {
      expensiveCalculation(count);
    }, 0);
    
    }, []);
  // If you type in the text input, you'll see the lag because
  // expensiveCalculation runs on every render.


  return (
    <div>
      <h1>useMemo Demo</h1>
      <h1 style={{color:'red'}}>React 19 Memoization: Is useMemo & useCallback No Longer Necessary</h1>

      {/* Counter section */}
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      {/* Text input section */}
      <p>Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

     
      {/* <p>Expensive Calculation Result: {memoizedValue}</p> */}
      <div id="dResult"></div>
    </div>
  );
}

export default DemoUseMemo;
