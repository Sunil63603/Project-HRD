import React from 'react';
// ❌where is App.css used?
import './index.css';//❌index.css is empty.

//components
import AppLayout from './components/AppLayout';//appLayout contains left(profile) and right(jobs,all profiles,updates,message) component. 

//context which indicates the components that needs to be rendered in the main container. 
import { VisibilityProvider } from './context/VisibilityContext';

function App() 
{
  return (
    <div className="App">
      {/* wrapping VisibilityProvider to the entire AppLayout ie.nothing but entire app*/}
      <VisibilityProvider>
        <AppLayout/>
      </VisibilityProvider>
    </div>
  );
}

export default App;
