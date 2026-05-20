import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef, useState } from 'react'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import { useControls } from 'leva';

const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 3
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
    ref.current.position.y = Math.sin(state.clock.elapsedTime)
    ref.current.position.x = Math.cos(state.clock.elapsedTime)
  })


  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )

}

const Sphere = ({ position, size, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef();

  useFrame((state, delta) => {
    const speed = isHovered ? .8 : .2
    ref.current.rotation.y += delta * speed;
  })
  return (

    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event)=>{event.stopPropagation(), setIsHovered(true)}}
      onPointerLeave={()=> {setIsHovered(false)}}
      onClick={()=>{setIsClicked(!isClicked)}}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "pink" : "lightblue"} wireframe />
    </mesh>
  )
}

const Torus = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ position, size }) => {

  const {color, radius} = useControls({
    color: "Lightblue",
    radius: {
      value: 1,
      min: 0,
      max: 10,
    }
  })

  const ref = useRef();

  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta * 2;
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime);
  //   ref.current.position.y = Math.sin(state.clock.elapsedTime)
  // })



  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius, ...size]} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={1} color={color} />
    </mesh>
  )
}

const Scene = () => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "yellow");
  const {lightColor, lightIntensity} = useControls({
    lightColor: "red",
    lightIntensity: {
      value: 2,
      min:0,
      max: 10,
      step: 0.1,
    }
  });

  return (
    <>
    {/* Lighting */}

      <directionalLight 
      position={[0, 1, 2]} 
      intensity={0.5} 
      ref={directionalLightRef}
      color={lightColor}
      />
      <ambientLight intensity={0.4} />


      {/* Materials */}

      {/* <group position={[0, 0, 1]}>
        <Cube position={[1, 1, 0]} color={"lightgreen"} size={[1, 1, 1]} />

        <Cube position={[-1, -1, 0]} color={"lightblue"} size={[1, 1, 1]} />

        <Cube position={[-1, 1, 0]} color={"cyan"} size={[1, 1, 1]} />

        <Cube position={[1, -1, 0]} color={"tomato"} size={[1, 1, 1]} />
      </group> */}

      {/* <Cube position={[0, 0, 0]} color={"darkcyan"} size={[1, 1, 1]} /> */}

      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"pink"} /> */}
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.12, 30, 30]} color={"purple"} /> */}
      <TorusKnot position={[0, 0, 0]} size={[ 0.1, 1000, 50]} color={"#64c1ff"} />
        <OrbitControls enableZoom={false}  />
    </>
  )
}

const App = () => {

  return (
    <Canvas>
      <Scene />
      
    </Canvas>
  )
}

export default App
