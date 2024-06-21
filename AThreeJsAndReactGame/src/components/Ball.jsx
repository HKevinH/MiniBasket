import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

// update the Ball component to use the useGLTF hookss
const Ball = ({ position }) => {
  const { nodes, materials } = useGLTF("/models/basketball.glb");

  return (
    <group position={position} scale={0.7}>
      <RigidBody
        colliders="ball"
        restitution={1}
        friction={0.2}
        gravityScale={3.4}
      >
        <mesh
          position={position}
          geometry={nodes.Sphere.geometry}
          material={materials["Material.001"]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/models/basketball.glb");

export default Ball;
