import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const NewtonsCradle = ({ mass, elasticity, stringLength, pendulums }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composite = Matter.Composite,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse;
    const engine = Engine.create(),
          world = engine.world;
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 1000,
        height: 430,
        wireframes: false,
        background: '#f1f1f1',
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const newtonsCradle = (xx, yy, size, mass, elasticity, stringLength, pendulums) => {
      const Composite = Matter.Composite,
            Constraint = Matter.Constraint,
            Bodies = Matter.Bodies;
      const newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

      for (let i = 0; i < pendulums; i++) {
        const separation = 1.9,
              circle = Bodies.circle(
                xx + i * (size * separation),
                yy + stringLength,
                Math.max(5, mass * 7),
                { 
                  inertia: Infinity, 
                  restitution: elasticity,
                  friction: 0, 
                  frictionAir: 0, 
                  slop: size * 0.02,
                  render: {
                    fillStyle: '#000000',
                  }
                }
              ),
              constraint = Constraint.create({ 
                pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle,
                render: {
                  strokeStyle: '#000000',
                  lineWidth: 2,
                }
              });
        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
      }

      return newtonsCradle;
    };

    const cradle = newtonsCradle(280, 47, 35, mass, elasticity, stringLength, pendulums);
    Composite.add(world, cradle);

    // mouse interactivity
    const mouse = Mouse.create(render.canvas),
          mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false,
              },
            },
          });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;
    Render.lookAt(render, {
      min: { x: 0, y: 50 },
      max: { x: 800, y: 600 },
    });

    // cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [mass, elasticity, stringLength, pendulums]);

  return <div ref={sceneRef}></div>;
};

export default NewtonsCradle;