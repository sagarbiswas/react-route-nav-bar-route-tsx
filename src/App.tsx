import React,{useState,useEffect} from 'react';
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
import DemoUseMemo from './DemoUseMemo';


function App() {
     const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup
  }, []);

   return (
    <div>
      {showContent ? (
        <RouterJsxModule /> 
         
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
    // <div className='flex-container'>
    //   <RouterJsxModule /> 
    
    // </div>
 
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
  //);
}

export default App;
