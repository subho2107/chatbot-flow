import React, { useCallback } from 'react';

 
import 'reactflow/dist/style.css';
import Header from './Components/Header/Header';
import FlowVisualiser from './Components/FlowVisualiser/FlowVisualiser';
import NodesPanel from './Components/NodesPanel/NodesPanel';

 
export default function App() {
 
  return (
    <div className='grid grid-rows-[1fr_14fr]'>
      <Header/>
      <FlowVisualiser/>
    </div>
  );
}

