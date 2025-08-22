import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedRobot from '../components/AnimatedRobot'

function CursorTrail() {
  const [points, setPoints] = useState([])
  const maxPoints = 16

  useEffect(() => {
    function onMove(e) {
      setPoints((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY }]
        while (next.length > maxPoints) next.shift()
        return next
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {points.map((p, i) => {
        const t = i / maxPoints
        const size = 14 + t * 12
        const opacity = 0.15 + t * 0.35
        return (
          <span
            key={i}
            className="absolute block rounded-full blur-xl"
            style={{
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              background:
                'radial-gradient(closest-side, rgba(34,211,238,1), rgba(59,130,246,0.0))',
              opacity,
            }}
          />
        )
      })}
    </div>
  )
}

function ParticlesBackground() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    function resize() {
      canvas.width = window.innerWidth * DPR
      canvas.height = window.innerHeight * DPR
      ctx.scale(DPR, DPR)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }))

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.fillStyle = 'rgba(34,211,238,0.5)'
      ctx.shadowColor = 'rgba(34,211,238,0.45)'
      ctx.shadowBlur = 12
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -50) p.x = window.innerWidth + 50
        if (p.x > window.innerWidth + 50) p.x = -50
        if (p.y < -50) p.y = window.innerHeight + 50
        if (p.y > window.innerHeight + 50) p.y = -50
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />
}

export default function Intro() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/home')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <section
      className="relative min-h-screen grid place-items-center overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(1200px 800px at 50% 0%, rgba(34,211,238,0.08), transparent 60%), #090a12',
      }}
    >
      <ParticlesBackground />
      <CursorTrail />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Robot */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <AnimatedRobot />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black tracking-tight"
          style={{
            textShadow:
              '0 0 10px rgba(34,211,238,0.8), 0 0 30px rgba(34,211,238,0.5), 0 0 60px rgba(34,211,238,0.35)',
          }}
        >
          VON RAZEL MORALES
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-cyan-200/80"
        >
          www.vonrazelmorales.com
        </motion.p>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 text-cyan-300/60 text-sm"
        >
          Redirecting in {timeLeft} seconds...
        </motion.div>
      </div>
    </section>
  )
}


