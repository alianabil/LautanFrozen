"use client"

import { useRef, useEffect } from "react"

interface OceanAnimationProps {
  className?: string
}

export function OceanAnimation({ className = "" }: OceanAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(30, 58, 138, 0.95)") // from-blue-900
      gradient.addColorStop(0.5, "rgba(8, 145, 178, 0.95)") // via-cyan-800
      gradient.addColorStop(1, "rgba(15, 118, 110, 0.95)") // to-teal-700
      return gradient
    }

    // Bubble class
    class Bubble {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      wobble: number
      wobbleSpeed: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = window.innerHeight + Math.random() * 100
        this.radius = Math.random() * 8 + 2
        this.speed = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.wobble = 0
        this.wobbleSpeed = Math.random() * 0.03 + 0.01
      }

      update() {
        this.y -= this.speed
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * 0.8

        // Reset if out of screen
        if (this.y < -this.radius * 2) {
          this.y = window.innerHeight + this.radius
          this.x = Math.random() * window.innerWidth
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()

        // Highlight
        ctx.beginPath()
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`
        ctx.fill()
      }
    }

    // Seaweed class
    class Seaweed {
      x: number
      segments: number
      height: number
      width: number
      color: string
      phase: number
      speed: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.segments = Math.floor(Math.random() * 5) + 5
        this.height = Math.random() * 100 + 50
        this.width = Math.random() * 20 + 10
        this.color = this.getRandomColor()
        this.phase = Math.random() * Math.PI * 2
        this.speed = Math.random() * 0.02 + 0.01
      }

      getRandomColor() {
        const colors = [
          "rgba(6, 182, 212, 0.6)", // cyan-500
          "rgba(20, 184, 166, 0.6)", // teal-500
          "rgba(16, 185, 129, 0.6)", // emerald-500
          "rgba(5, 150, 105, 0.6)", // green-600
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        const segmentHeight = this.height / this.segments
        const bottomY = window.innerHeight

        ctx.beginPath()
        ctx.moveTo(this.x, bottomY)

        for (let i = 1; i <= this.segments; i++) {
          const segmentY = bottomY - i * segmentHeight
          const xOffset = Math.sin(time * this.speed + this.phase + i * 0.3) * (i * 3)
          const segmentWidth = this.width * (1 - (i / this.segments) * 0.5)

          ctx.quadraticCurveTo(this.x + xOffset, segmentY + segmentHeight / 2, this.x + xOffset / 2, segmentY)
        }

        for (let i = this.segments; i >= 1; i--) {
          const segmentY = bottomY - i * segmentHeight
          const xOffset = Math.sin(time * this.speed + this.phase + i * 0.3) * (i * 3)
          const segmentWidth = this.width * (1 - (i / this.segments) * 0.5)

          ctx.quadraticCurveTo(this.x - xOffset, segmentY + segmentHeight / 2, this.x - xOffset / 2, segmentY)
        }

        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Fish class
    class Fish {
      x: number
      y: number
      size: number
      speed: number
      color: string
      direction: number
      wobble: number
      wobbleSpeed: number
      tailSpeed: number
      tailAngle: number

      constructor() {
        this.direction = Math.random() > 0.5 ? 1 : -1
        this.x = this.direction > 0 ? -50 : window.innerWidth + 50
        this.y = Math.random() * (window.innerHeight * 0.8)
        this.size = Math.random() * 20 + 10
        this.speed = (Math.random() * 1 + 0.5) * this.direction
        this.color = this.getRandomColor()
        this.wobble = 0
        this.wobbleSpeed = Math.random() * 0.1 + 0.05
        this.tailSpeed = Math.random() * 0.2 + 0.1
        this.tailAngle = 0
      }

      getRandomColor() {
        const colors = [
          "#60A5FA", // blue-400
          "#38BDF8", // sky-400
          "#22D3EE", // cyan-400
          "#2DD4BF", // teal-400
          "#FB923C", // orange-400
          "#F87171", // red-400
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speed
        this.wobble += this.wobbleSpeed
        this.y += Math.sin(this.wobble) * 0.5
        this.tailAngle = Math.sin(time * this.tailSpeed) * 0.3

        // Reset if out of screen
        if ((this.direction > 0 && this.x > window.innerWidth + 100) || (this.direction < 0 && this.x < -100)) {
          this.direction = Math.random() > 0.5 ? 1 : -1
          this.x = this.direction > 0 ? -50 : window.innerWidth + 50
          this.y = Math.random() * (window.innerHeight * 0.8)
          this.speed = (Math.random() * 1 + 0.5) * this.direction
        }
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.direction, 1)

        // Body
        ctx.beginPath()
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Tail
        ctx.save()
        ctx.translate(-this.size * 0.8, 0)
        ctx.rotate(this.tailAngle)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-this.size * 0.7, this.size * 0.5)
        ctx.lineTo(-this.size * 0.7, -this.size * 0.5)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()

        // Eye
        ctx.beginPath()
        ctx.arc(this.size * 0.5, -this.size * 0.1, this.size * 0.15, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.size * 0.55, -this.size * 0.1, this.size * 0.07, 0, Math.PI * 2)
        ctx.fillStyle = "black"
        ctx.fill()

        // Fin
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(0, -this.size * 0.8, this.size * 0.3, -this.size * 0.3)
        ctx.lineTo(0, 0)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.7
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.restore()
      }
    }

    // Coral class
    class Coral {
      x: number
      y: number
      size: number
      color: string
      branches: number
      swaySpeed: number
      swayAmount: number
      phase: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = window.innerHeight
        this.size = Math.random() * 30 + 20
        this.color = this.getRandomColor()
        this.branches = Math.floor(Math.random() * 5) + 3
        this.swaySpeed = Math.random() * 0.02 + 0.01
        this.swayAmount = Math.random() * 5 + 3
        this.phase = Math.random() * Math.PI * 2
      }

      getRandomColor() {
        const colors = [
          "#F472B6", // pink-400
          "#FB7185", // rose-400
          "#FB923C", // orange-400
          "#FBBF24", // amber-400
          "#A78BFA", // violet-400
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        const sway = Math.sin(time * this.swaySpeed + this.phase) * this.swayAmount

        // Base
        ctx.beginPath()
        ctx.moveTo(this.x - this.size / 4, this.y)
        ctx.lineTo(this.x + this.size / 4, this.y)
        ctx.lineTo(this.x + sway / 2, this.y - this.size / 3)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()

        // Branches
        for (let i = 0; i < this.branches; i++) {
          const angle = (Math.PI * i) / this.branches
          const length = this.size * (0.5 + Math.random() * 0.5)
          const branchX = this.x + Math.cos(angle) * (this.size / 3) + sway
          const branchY = this.y - this.size / 3 - Math.sin(angle) * (this.size / 3)

          ctx.beginPath()
          ctx.moveTo(this.x + sway / 2, this.y - this.size / 3)
          ctx.quadraticCurveTo(
            branchX + Math.random() * 10 - 5 + sway / 2,
            branchY - length / 2,
            branchX + sway,
            branchY - length,
          )
          ctx.lineWidth = 3 + Math.random() * 2
          ctx.strokeStyle = this.color
          ctx.stroke()

          // Small circles at the end of branches
          ctx.beginPath()
          ctx.arc(branchX + sway, branchY - length, 3 + Math.random() * 3, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }
    }

    // Light ray class
    class LightRay {
      x: number
      width: number
      height: number
      opacity: number
      speed: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.width = Math.random() * 100 + 50
        this.height = window.innerHeight
        this.opacity = Math.random() * 0.1 + 0.05
        this.speed = Math.random() * 0.2 + 0.1
      }

      update() {
        this.x += this.speed
        if (this.x > window.innerWidth + this.width) {
          this.x = -this.width
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(this.x, 0, this.width, this.height)
      }
    }

    // Plankton class
    class Plankton {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      angle: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.speed = Math.random() * 0.3 + 0.1
        this.angle = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
      }

      update() {
        this.angle += this.rotationSpeed
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth
        if (this.x > window.innerWidth) this.x = 0
        if (this.y < 0) this.y = window.innerHeight
        if (this.y > window.innerHeight) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Create objects
    const bubbles: Bubble[] = []
    const seaweeds: Seaweed[] = []
    const fishes: Fish[] = []
    const corals: Coral[] = []
    const lightRays: LightRay[] = []
    const planktons: Plankton[] = []

    // Calculate number of objects based on screen size
    const screenArea = window.innerWidth * window.innerHeight
    const bubbleCount = Math.max(30, Math.floor(screenArea / 10000))
    const seaweedCount = Math.max(10, Math.floor(screenArea / 30000))
    const fishCount = Math.max(8, Math.floor(screenArea / 40000))
    const coralCount = Math.max(5, Math.floor(screenArea / 50000))
    const lightRayCount = Math.max(3, Math.floor(screenArea / 100000))
    const planktonCount = Math.max(50, Math.floor(screenArea / 5000))

    // Initialize bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble())
    }

    // Initialize seaweeds - distribute evenly across the width
    for (let i = 0; i < seaweedCount; i++) {
      const seaweed = new Seaweed()
      seaweed.x = (window.innerWidth / seaweedCount) * i + Math.random() * (window.innerWidth / seaweedCount / 2)
      seaweeds.push(seaweed)
    }

    // Initialize fishes
    for (let i = 0; i < fishCount; i++) {
      fishes.push(new Fish())
    }

    // Initialize corals - distribute evenly across the width
    for (let i = 0; i < coralCount; i++) {
      const coral = new Coral()
      coral.x = (window.innerWidth / coralCount) * i + Math.random() * (window.innerWidth / coralCount / 2)
      corals.push(coral)
    }

    // Initialize light rays
    for (let i = 0; i < lightRayCount; i++) {
      lightRays.push(new LightRay())
    }

    // Initialize planktons
    for (let i = 0; i < planktonCount; i++) {
      planktons.push(new Plankton())
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Fill with gradient
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw light rays
      lightRays.forEach((ray) => {
        ray.update()
        ray.draw()
      })

      // Draw corals
      corals.forEach((coral) => {
        coral.draw()
      })

      // Draw seaweeds
      seaweeds.forEach((seaweed) => {
        seaweed.draw()
      })

      // Draw planktons
      planktons.forEach((plankton) => {
        plankton.update()
        plankton.draw()
      })

      // Draw fishes
      fishes.forEach((fish) => {
        fish.update()
        fish.draw()
      })

      // Draw bubbles
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })

      time += 0.03
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 pointer-events-none ${className}`} />
}

export default OceanAnimation
