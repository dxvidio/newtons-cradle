import NewtonsCradle from './NewtonsCradle.tsx';
import React from 'react';
import simImg from './media/sim.png';
import graphImg from './media/graph.png';
import { TextField } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <div className='title'>Newton's Cradle</div>
      </div>

      <div className='content'>
        <div className='canvas-bg'>
          <div className='menu'>
            <img src={simImg} alt='' className='sim-icon'/>
            <img src={graphImg} alt='' className='graph-icon'/>
          </div>
          <div className='simulation'>
            <NewtonsCradle/>
          </div>
        </div>
      </div>

      <div className='user-controls'>
        <div className='input-fields'>
          <TextField id="outlined-uncontrolled" label="Mass (kg)" defaultValue="1"/>
          <TextField id="outlined-uncontrolled" label="Pendulums" defaultValue="5"/>
          <TextField id="outlined-uncontrolled" label="String Length (cm)" defaultValue="30"/>
          <TextField id="outlined-uncontrolled" label="Elasticity" defaultValue="1.00"/>
        </div>
      </div>

    </div>
  );
}

export default App;
