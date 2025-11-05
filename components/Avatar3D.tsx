import { useRef } from 'react'
import { Mesh } from 'three'

interface AvatarData {
  layers: {
    hair: string
    eyes: string
    mouth: string
    clothes: string
    accessories: string[]
  }
  colors: {
    skin: string
    hair: string
    eyes: string
    clothes: string
  }
}

interface Avatar3DProps {
  avatarData: AvatarData
}

export default function Avatar3D({ avatarData }: Avatar3DProps) {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef}>
      {/* Head */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={avatarData.colors.skin} />

      {/* Hair */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={avatarData.colors.hair} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={avatarData.colors.eyes} />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={avatarData.colors.eyes} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, -0.2, 0.8]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 2, 16]} />
        <meshStandardMaterial color={avatarData.colors.clothes} />
      </mesh>
    </mesh>
  )
}