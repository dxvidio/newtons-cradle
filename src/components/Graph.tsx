import React from 'react';

const Graph = ({ period }) => {
  const frequency = 1 / period;
  
  return (
    <div className='grid'>
      <div className='item'>
        <h1 className='description'>
          "For Every Action, There is an Equal and Opposite Reaction."
        </h1>
      </div>
      <div className='item'>
        <p className='sub-description'>
          Newton's Cradle is a device that demonstrates the conservation of momentum and energy. When one ball on the end is lifted and released, it strikes the stationary balls, setting the last ball into motion. The last ball then swings back and strikes the stationary balls, setting the first ball into motion. This process continues indefinitely.
        </p>
      </div>
      <div className='item'>
        <button onClick={() => alert("Formula: period = 2π√(length/gravity). This formula calculates the period of a pendulum which is the time for one complete cycle, a left swing and a right swing.")} className='value'>
          {period.toFixed(2)}s
        </button>
        <p className='sub-description'>Period of Each Pendulum</p>
      </div>
      <div className='item'>
        <button onClick={() => alert("Formula: frequency = 1/period. This formula calculates the frequency of a pendulum which is the number of occilations per second.")} className='value'>
          {frequency.toFixed(2)}Hz
        </button>
        <p className='sub-description'>Occilation Frequency</p>
      </div>
    </div>
  );
};

export default Graph;