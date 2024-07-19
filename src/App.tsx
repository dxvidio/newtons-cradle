import React, { useState } from 'react';
import NewtonsCradle from './NewtonsCradle.tsx';
import simImg from './media/sim.png';
import graphImg from './media/graph.png';
import { TextField } from '@mui/material';
import './App.css';
import { validateMass } from './utils.tsx';

function App() {
  const [mass, setMass] = useState('5');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMassChange = (e) => {
    const newMass = e.target.value;
    try {
      if (newMass === '') {
        setErrorMessage('');
        setMass('');
        return;
      }
      validateMass(Number(newMass));
      setMass(newMass);
      setErrorMessage('');
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };


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
            <NewtonsCradle mass={mass}/>
          </div>
        </div>
      </div>

      <div className='user-controls'>
        <div className='input-fields'>
          <TextField 
            id="mass" 
            label="Mass (g)" 
            value={mass}
            onChange={handleMassChange}
            error={errorMessage !== ''}
            helperText={errorMessage}
          />
          <TextField id="pendulums" label="Pendulums" defaultValue="5"/>
          <TextField id="string-length" label="String Length (cm)" defaultValue="30"/>
          <TextField id="elasticity" label="Elasticity" defaultValue="1.00"/>
        </div>
      </div>
    </div>
  );
}

export default App;
