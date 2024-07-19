import React, { useEffect, useRef } from 'react';
import { Stage, Container, Graphics } from '@pixi/react';
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';

var Cradle = Cradle || {};

Cradle.newtonsCradle = function(engine) {
    var Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies;

    var xx = 200,
        yy = 100,
        number = 5,
        size = 20,
        length = 200;

    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

    for (var i = 0; i < number; i++) {
        var separation = 1.9,
            circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, slop: size * 0.02 }),
            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
    }

    Matter.World.add(engine.world, newtonsCradle);
    Matter.Body.translate(newtonsCradle.bodies[0], { x: -180, y: -100 });

    return newtonsCradle;
};

export default function NewtonsCradle() {
    const ref = useRef(null);
    const graphicsRef = useRef<PIXI.Graphics | null>(null);

    useEffect(() => {
        const engine = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Create the Newton's Cradle
        Cradle.newtonsCradle(engine);

        const update = () => {
            Matter.Engine.update(engine);
            if (graphicsRef.current) {
                graphicsRef.current.clear();
                graphicsRef.current.lineStyle(2, 0x000000, 1);

                const bodies = Matter.Composite.allBodies(engine.world);
                bodies.forEach(body => {
                    const vertices = body.vertices;
                    graphicsRef.current?.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) {
                        graphicsRef.current?.lineTo(vertices[j].x, vertices[j].y);
                    }
                    graphicsRef.current?.lineTo(vertices[0].x, vertices[0].y);

                    if (body.label === 'Newtons Cradle') {
                        const partA = body.parts[0];
                        const partB = body.parts[1];
                        graphicsRef.current?.moveTo(partA.position.x, partA.position.y);
                        graphicsRef.current?.lineTo(partB.position.x, partB.position.y);
                    }

                    if (body.label === 'Circle Body') {
                        graphicsRef.current?.beginFill(0x000000);
                        graphicsRef.current?.drawCircle(body.position.x, body.position.y, body.circleRadius);
                        graphicsRef.current?.endFill();

                        // Draw the strings
                        const attachmentPointX = body.position.x;
                        const attachmentPointY = 100;
                        graphicsRef.current?.moveTo(attachmentPointX, attachmentPointY);
                        graphicsRef.current?.lineTo(body.position.x, body.position.y);
                    }
                });
            }
        };

        // Update loop
        const ticker = new PIXI.Ticker();
        ticker.add(update);
        ticker.start();

        return () => {
            ticker.stop();
            Matter.Runner.stop(runner);
        };
    }, []);

    return (
        <Stage width={600} height={350} options={{ backgroundColor: 0xF1F1F1 }}>
            <Container ref={ref}>
                <Graphics ref={graphicsRef} />
            </Container>
        </Stage>
    );
};