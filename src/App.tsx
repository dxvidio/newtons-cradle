import React, { useState } from 'react';
import NewtonsCradle from './NewtonsCradle.tsx';
import simImg from './media/sim.png';
import graphImg from './media/graph.png';
import { TextField } from '@mui/material';
import './App.css';
import { validateMass } from './utils.tsx';

function App() {
  const [mass, setMass] = useState('5');
  const [elasticity, setElasticity] = useState('1.0');
  const [stringLength, setStringLength] = useState('350');
  const [pendulums, setPendulums] = useState('5');
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
  const handleElasticChange = (e) => {
    const newElastic = e.target.value;
    if (isNaN(newElastic) || newElastic < 0 || newElastic > 1) {
      setErrorMessage('Elasticity must be between 0 and 1');
    } else {
      setElasticity(newElastic);
      setErrorMessage('');
    }
  };
  const handleLength = (e) => {
    const newLength = e.target.value;
    if (isNaN(newLength) || newLength < 100 || newLength > 400) {
      setErrorMessage('String length must be between 100 and 400');
    } else {
      setStringLength(newLength);
      setErrorMessage('');
    }
  };
  const handlePendulums = (e) => {
    const newPendulums = e.target.value;
    if (isNaN(newPendulums) || newPendulums < 0 || newPendulums > 5) {
      setErrorMessage('Number must be between 0 and 5');
    } else {
      setPendulums(newPendulums);
      setErrorMessage('');
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
            <NewtonsCradle mass={mass} elasticity={Number(elasticity)} stringLength={Number(stringLength)} pendulums={Number(pendulums)}/>
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
          <TextField 
            id="pendulums" 
            label="Pendulums" 
            value={pendulums}
            onChange={handlePendulums}
            error={errorMessage !== ''}
            helperText={errorMessage}
          />
          <TextField 
            id="string-length" 
            label="String Length (mm)" 
            value={stringLength}
            onChange={handleLength}
            error={errorMessage !== ''}
            helperText={errorMessage}
          />
          <TextField 
            id="elasticity" 
            label="Elasticity" 
            value={elasticity}
            onChange={handleElasticChange}
            error={errorMessage !== ''}
            helperText={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
