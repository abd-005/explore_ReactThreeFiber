import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef, useState } from 'react'

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

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime);
    ref.current.position.y = Math.sin(state.clock.elapsedTime)
  })

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const App = () => {

  return (
    <Canvas>

      {/* Lighting */}

      <directionalLight position={[1, 1, 3]} intensity={0.5} />
      <ambientLight intensity={0.4} />


      {/* Materials */}

      {/* <group position={[0, 0, 1]}>
        <Cube position={[1, 1, 0]} color={"lightgreen"} size={[1, 1, 1]} />

        <Cube position={[-1, -1, 0]} color={"lightblue"} size={[1, 1, 1]} />

        <Cube position={[-1, 1, 0]} color={"cyan"} size={[1, 1, 1]} />

        <Cube position={[1, -1, 0]} color={"tomato"} size={[1, 1, 1]} />
      </group> */}

      {/* <Cube position={[0, 0, 0]} color={"darkcyan"} size={[1, 1, 1]} /> */}

      <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"pink"} />
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.12, 30, 30]} color={"purple"} /> */}
      {/* <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"hotpink"} /> */}

    </Canvas>
  )
}

export default App
