import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody, vec3 } from "@react-three/rapier";
import useGame from "../store/useGame";
const Table = (props) => {
  const controlA = useRef(null);
  const controlB = useRef(null);
  const thrusterA = useRef(null);
  const thrusterB = useRef(null);
  const [isScored, setIsScored] = React.useState(false);
  const increaseStore = useGame((state) => state.increment);
  const { nodes, materials } = useGLTF("/models/table.gltf");
  //#region

  const goal = () => {
    if (!isScored) {
      setIsScored(true);
      increaseStore();
    }
  };

  const clickUp = (controlRef) => {
    if (controlRef.current) {
      controlRef.current.position.y = 0.128;

      if (controlRef === controlA) {
        const position = vec3(thrusterA.current.translation());
        thrusterA.current.setNextKinematicTranslation({
          x: position.x,
          y: position.y - 0.5,
          z: position.z,
        });
      } else {
        const position = vec3(thrusterB.current.translation());
        thrusterB.current.setNextKinematicTranslation({
          x: position.x,
          y: position.y - 0.5,
          z: position.z,
        });
      }
    }
  };

  const clickDown = (controlRef) => {
    if (controlRef.current) {
      controlRef.current.position.y = 0.128 - 0.1;

      if (controlRef === controlA) {
        const position = vec3(thrusterA.current.translation());
        thrusterA.current.setNextKinematicTranslation({
          x: position.x,
          y: position.y + 0.5,
          z: position.z,
        });
      } else {
        const position = vec3(thrusterB.current.translation());
        thrusterB.current.setNextKinematicTranslation({
          x: position.x,
          y: position.y + 0.5,
          z: position.z,
        });
      }
    }
  };

  //#endregion
  return (
    <group {...props} dispose={null}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.6}
        friction={0}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Table.geometry}
          material={materials.Wood}
          position={[0, 0.068, 0]}
        />

        <CuboidCollider
          args={[0, 2, 1.5]}
          position={[1.5, 1.5, 0]}
          sensor
          onIntersectionExit={() => setIsScored(false)}
        />
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Controls.geometry}
        material={materials.Wood}
        position={[4.135, 0.092, -0.003]}
      />
      <mesh
        ref={controlA}
        onPointerUp={() => clickUp(controlA)}
        onPointerDown={() => clickDown(controlA)}
        castShadow
        receiveShadow
        geometry={nodes.Control_A.geometry}
        material={materials.Red}
        position={[4.184, 0.129, 0.744]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Control_A_Text.geometry}
          material={materials.White}
          position={[0.237, 0.046, 0.21]}
          rotation={[Math.PI / 2, 1.179, -Math.PI / 2]}
        />
      </mesh>
      <mesh
        ref={controlB}
        onPointerUp={() => clickUp(controlB)}
        onPointerDown={() => clickDown(controlB)}
        castShadow
        receiveShadow
        geometry={nodes.Control_B.geometry}
        material={materials.Green}
        position={[4.183, 0.128, -0.754]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Control_B_Text.geometry}
          material={materials.White}
          position={[0.25, 0.043, 0.207]}
          rotation={[Math.PI / 2, 1.184, -Math.PI / 2]}
        />
      </mesh>

      <RigidBody
        ref={thrusterB}
        colliders="hull"
        type="kinematicPosition"
        lockRotations={true}
        enabledTranslations={[false, true, false]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Thruster_B.geometry}
          material={materials.Black}
          position={[2.259, -0.189, -0.764]}
        />
      </RigidBody>

      <RigidBody
        ref={thrusterA}
        colliders="hull"
        type="kinematicPosition"
        lockRotations={true}
        enabledTranslations={[false, true, false]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Thruster_A.geometry}
          material={materials.Black}
          position={[2.259, -0.189, 0.765]}
        />
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Hide_Thruster.geometry}
        material={materials.Black}
        position={[2.257, -0.047, 0]}
      />
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Base.geometry}
          material={materials.Wood}
          position={[-2.235, 0.565, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.Red}
          position={[-2.235, 1.177, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Panel.geometry}
          material={materials.Wood}
          position={[-2.234, 1.814, 0]}
        />

        <CuboidCollider
          args={[0.35, 0.1, 0.35]}
          position={[-1.686, 1.4, 0]}
          sensor
          onIntersectionEnter={() => console.log("Goal!")}
          onIntersectionExit={goal}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ring.geometry}
            material={materials.Red}
            position={[0, 0.06, 0]}
          />
        </CuboidCollider>
      </RigidBody>

      <RigidBody
        colliders="trimesh"
        type="fixed"
        restitution={0}
        friction={0.2}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          position={[0.497, 1.54, 0.005]}
        >
          <MeshTransmissionMaterial
            anisotropy={0.1}
            chromaticAberration={0.04}
            distortionScale={0}
            temporalDistortion={0}
          />
        </mesh>
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/models/table.gltf");

export default Table;
