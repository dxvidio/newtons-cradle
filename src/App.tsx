import React, { useState } from 'react';
import NewtonsCradle from './components/NewtonsCradle.tsx';
import Graph from './components/Graph.tsx';
import { createInputHandler, validationRules } from './utils.tsx';
import simImg from './media/sim.png';
import graphImg from './media/graph.png';
import { TextField } from '@mui/material';
import './App.css';

function App() {
  const [showSimulation, setShowSimulation] = useState(true);
  const [showGraph, setShowGraph] = useState(false);

  const toggleGraph = () => setShowGraph(!showGraph);

  const toggleSimulation = () => setShowSimulation(!showSimulation);

  const [mass, setMass] = useState('5');
  const [elasticity, setElasticity] = useState('1.0');
  const [stringLength, setStringLength] = useState('350');
  const [pendulums, setPendulums] = useState('5');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMassChange = createInputHandler(setMass, setErrorMessage, validationRules.mass);
  const handleElasticChange = createInputHandler(setElasticity, setErrorMessage, validationRules.elasticity);
  const handleLength = createInputHandler(setStringLength, setErrorMessage, validationRules.stringLength);
  const handlePendulums = createInputHandler(setPendulums, setErrorMessage, validationRules.pendulums);

  return (
    <div className="App">
      <div className='header'>
        <div className='title'>Newton's Cradle</div>
      </div>

      <div className='content'>
        <div className='canvas-bg'>
          <div className='menu'>
            <img src={simImg} alt='' className='sim-icon' onClick={() => { setShowGraph(false); setShowSimulation(true); }}/>
            <img src={graphImg} alt='' className='graph-icon' onClick={() => { setShowGraph(true); setShowSimulation(false); }}/>
            {showGraph && <Graph />}
          </div>
          {showSimulation && (
            <div className='simulation'>
              <NewtonsCradle mass={mass} elasticity={Number(elasticity)} stringLength={Number(stringLength)} pendulums={Number(pendulums)}/>
            </div>
          )}
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
