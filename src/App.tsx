import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import RouterJsxModule from './utility/RouterJsxModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardComponent from './DashboardComponent';

function MyButton({ title, onClock_Event }: { title: string; onClock_Event: () => void }) {
  return (
    <button onClick={onClock_Event}>{title}</button>
  );
}

function App() {
  
  return (
    <div className='flex-container'>
     <RouterJsxModule />
    </div>
 
    // <Router>
    //   <div className="App">
    //     {/* <Navbar isLoggedIn={isLoggedIn} userType={userType} /> */}

    //     <Routes>
    //       <Route path="/parent" element={<ParentComponent />} />
    //       <Route path="/parent2" element={<ParentComponent2 />} />
    //       <Route path="/child" element={<ChildComponent onDataSend={MyButton} />} />
    //       <Route path="/child3" element={<ChildComponent2 />} />
    //       <Route path="/about" element={<AboutComponent />} />
    //         <Route path="/" element={<DashboardComponent />} />
          
    //       <Route path="*" element={<Navigate to="/" />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
