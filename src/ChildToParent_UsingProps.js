// ParentComponent.js
import React, { useState } from 'react';

function App() {
  return <ParentComponent />
}

function ChildComponent(props) {
  const handleClick = () => {
    props.onAction('Hello from Child!');
  };

  return (
    <button onClick={handleClick}>
      Trigger Parent Action
    </button>
  );
}

function ParentComponent() {
  const [message, setMessage] = useState('');

  const handleChildAction = (dataFromChild) => {
    setMessage(`Message from child: ${dataFromChild}`);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>{message}</p>
      <ChildComponent onAction={handleChildAction} />
    </div>
  );
}

export default ParentComponent; // Only one default export
export { App, ChildComponent }; // Named exports for others
