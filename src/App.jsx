import { Canvas } from '@react-three/fiber'
import './App.css'

const Cube = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )

}

const App = () => {

  return (
    <Canvas>
      <directionalLight position={[1, 1, 3]} />

      <Cube position={[1, 1, 0]} color={"lightgreen"} size={[1, 1, 1]} />

      <Cube position={[-1, -1, 0]} color={"lightblue"} size={[1, 1, 1]} />

      <Cube position={[-1, 1, 0]} color={"cyan"} size={[1, 1, 1]} />
      
      <Cube position={[1, -1, 0]} color={"tomato"} size={[1, 1, 1]} />
    </Canvas>
  )
}

export default App
