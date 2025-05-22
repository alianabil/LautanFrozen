"use client"

import { useRef, useEffect } from "react"

interface WaveAnimationProps {
  className?: string
}

export function WaveAnimation({ className = "" }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 180 // Increased height to avoid visible edges
    }

    resize()
    window.addEventListener("resize", resize)

    // Animation loop
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Gradient background to match the section above
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(30, 58, 138, 1)") // from-blue-900
      gradient.addColorStop(0.5, "rgba(8, 145, 178, 1)") // via-cyan-800
      gradient.addColorStop(1, "rgba(15, 118, 110, 1)") // to-teal-700

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // First wave (back)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let i = 0; i < canvas.width; i++) {
        const x = i
        const y = Math.sin(i * 0.006 + time * 0.3) * 15 + Math.sin(i * 0.002 + time * 0.1) * 8 + canvas.height * 0.5
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
      ctx.fill()

      // Second wave (middle)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let i = 0; i < canvas.width; i++) {
        const x = i
        const y = Math.sin(i * 0.008 + time * 0.4) * 12 + Math.sin(i * 0.004 + time * 0.2) * 6 + canvas.height * 0.65
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)"
      ctx.fill()

      // Third wave (front)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let i = 0; i < canvas.width; i++) {
        const x = i
        const y = Math.sin(i * 0.01 + time * 0.5) * 8 + Math.sin(i * 0.006 + time * 0.3) * 4 + canvas.height * 0.8
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)"
      ctx.fill()

      time += 0.03
      animationFrameId = requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute bottom-0 left-0 w-full h-[180px] pointer-events-none ${className}`}
      style={{ marginBottom: "-2px" }} // Prevent gap between sections
    />
  )
}

export default WaveAnimation
