import React from "react";
import { Box, Center, Environment, OrbitControls } from "@react-three/drei";
import Table from "./components/Table";
import Ball from "./components/Ball";
import { Physics } from "@react-three/rapier";
import Confetti from "./components/Confetti";
const Experience = () => {
  return (
    <>
      <color attach="background" args={["#ddc28d"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Environment preset="city" />

      <OrbitControls makeDefault />
      <Confetti
        isExploding={false}
        rate={2}
        areaWidth={5}
        areaHeight={3}
        fallingHeight={6}
      />
      <Physics debug>
        <Center>
          <Table position={[0, 0, 0]} rotation={[0, -(Math.PI / 2), 0]} />
          <Ball position={[0.25, 1.5, 0.2]} />
        </Center>
      </Physics>
    </>
  );
};

export default Experience;
