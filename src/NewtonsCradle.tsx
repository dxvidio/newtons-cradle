import React, { useEffect, useRef } from 'react';
import { Stage, Container, Graphics } from '@pixi/react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';

const NewtonsCradle = () => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const circleRef = useRef<Matter.Bodies.circle | null>(null);
  const graphicsRef = useRef<PIXI.Graphics | null>(null);

  useEffect(() => {
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const circle = Matter.Bodies.circle(400, 300, 50, { restitution: 0.8, });
    circleRef.current = circle;
    Matter.World.add(engine.world, [circle]);

    const update = () => {
      if (circleRef.current && graphicsRef.current) {
        const { x, y } = circleRef.current.position;
        graphicsRef.current.clear();
        graphicsRef.current.beginFill(0xFFFFFF);
        graphicsRef.current.drawCircle(x, y, 25);
        graphicsRef.current.endFill();
      }
      requestAnimationFrame(update);
    };
    update();

    return () => {
      Matter.World.remove(engine.world, circle);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
      <Container>
        <Graphics ref={graphicsRef} />
      </Container>
    </Stage>
  );
};

export default NewtonsCradle;
