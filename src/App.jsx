import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef } from 'react'
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
  const ref = useRef();

useFrame( (state, delta) => {
  ref.current.rotation.y += delta * .2;
})
  return (

    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
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

  useFrame( (state, delta) => {
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
