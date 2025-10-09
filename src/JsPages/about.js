import React ,{Suspense} from "react";
//import DemoUseMemo from '../DemoUseMemo'
function About() {
    //return <h1>About us</h1>;
  const DemoUseMemo = React.lazy(() => 
  new Promise(resolve => 
    setTimeout(() => resolve(import('../DemoUseMemo')), 2000)
    )
  );
    return (
      <div children="parent-container">
        <h1>About Us</h1>
        <p>This is the about page of our application.</p>
       <Suspense fallback={<div>Loading DemoUseMemo...</div>}>
          <DemoUseMemo />
        </Suspense>
      </div>
    );
  }
  export default About;
  