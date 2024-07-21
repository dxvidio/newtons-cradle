import React from 'react';

const Graph = () => {
  return (
    <div className='grid'>
      <div className='item'>
        <h3>
          Newton's Cradle is a fascinating device that demonstrates the conservation of momentum and energy through a series of swinging spheres. 
          The lab allows users to adjust parameters such as the mass of the spheres, the elasticity of the collisions, the length of the strings, and the number of pendulums.
        </h3>
      </div>
      <div className='item'>
        <h3>Isaac Newtons's third law of motion states that for every action, there is an equal and opposite reaction</h3>
      </div>
      <div className='item'>
        <h3>Period of Each Pendulum:</h3>
        <p className='value'>9.8</p>
        {/* <p>T=2/pi/sqrt(length of string / 9.81)</p> */}
      </div>
      <div className='item'>
        <h3>Frequency of Occilations:</h3>
        <p className='value'>9.8</p>
        {/* <p>f=1/T</p> */}
      </div>
    </div>
  );
};

export default Graph;