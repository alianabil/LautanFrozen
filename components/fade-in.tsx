"use client"
import { useInView } from "react-intersection-observer"

export function FadeIn({ children, delay = 0, className = "", ...props }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}s`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Also export as default for compatibility with existing imports
export default FadeIn
