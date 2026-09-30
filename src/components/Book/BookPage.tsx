import { useRef, useEffect, useState } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { PageMaterial } from './PageMaterial'

extend({ PageMaterial })



declare module '@react-three/fiber' {
  interface ThreeElements {
    pageMaterial: any
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pageMaterial: any
    }
  }
}

interface BookPageProps {
  index: number
  targetProgress: number // 0 or 1
  frontContent?: React.ReactNode
  backContent?: React.ReactNode
}

export function BookPage({ index, targetProgress, frontContent, backContent }: BookPageProps) {
  const materialRef = useRef<any>(null)
  
  const [isTurning, setIsTurning] = useState(false)
  const [isFlipped, setIsFlipped] = useState(targetProgress >= 0.5)

  useEffect(() => {
    if (materialRef.current) {
      setIsTurning(true)
      
      import('gsap').then(gsap => {
        gsap.default.to(materialRef.current, {
          uProgress: targetProgress,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            const flipped = materialRef.current.uProgress >= 0.5
            setIsFlipped(prev => {
              if (prev !== flipped) return flipped
              return prev
            })
          },
          onComplete: () => {
            setIsTurning(false)
          }
        })
      })
    }
  }, [targetProgress])

  return (
    <group position={[0, index * 0.005, 0]}>
      {/* 
          The mesh is rotated to lay flat. 
          Its local X is right (width 3), local Y is -Z (height 4).
      */}
      <mesh
        castShadow
        receiveShadow
        position={[1.5, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3.0, 4.2, 32, 32]} />
        <pageMaterial
          ref={materialRef}
          uColor={new THREE.Color('#fffcf5')}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front HTML Content */}
      {!isFlipped && (
        <Html
          transform
          distanceFactor={5.5}
          position={[1.5, 0.015, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          style={{ width: '500px', height: '700px', pointerEvents: 'none' }}
        >
          <div className="w-full h-full text-black select-none pointer-events-auto bg-transparent">
            {frontContent}
          </div>
        </Html>
      )}

      {/* Back HTML Content */}
      {isFlipped && (
        <Html
          transform
          distanceFactor={5.5}
          position={[-1.5, 0.015, 0]}
          rotation={[-Math.PI / 2, Math.PI, 0]}
          style={{ width: '500px', height: '700px', pointerEvents: 'none' }}
        >
          <div className="w-full h-full text-black select-none pointer-events-auto bg-transparent scale-x-[-1]">
            {backContent}
          </div>
        </Html>
      )}
    </group>
  )
}
