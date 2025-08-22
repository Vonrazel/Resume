import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedRobot() {
  const robotRef = useRef(null)

  useEffect(() => {
    const robot = robotRef.current
    if (!robot) return

    // Add floating animation
    const animate = () => {
      const time = Date.now() * 0.001
      robot.style.transform = `translateY(${Math.sin(time * 2) * 10}px) rotateY(${Math.sin(time) * 5}deg)`
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1, type: "spring" }}
      className="relative w-32 h-32 mx-auto"
      ref={robotRef}
    >
      {/* Robot Body */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-2xl border-2 border-cyan-400">
        {/* Robot Head */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full border-2 border-cyan-400">
          {/* Eyes */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 left-3 w-3 h-3 bg-cyan-400 rounded-full shadow-lg"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full shadow-lg"
          />
          
          {/* Mouth */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-cyan-400 rounded-full" />
        </div>

        {/* Robot Chest */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg border border-cyan-400">
          {/* Chest Panel */}
          <div className="absolute inset-2 bg-slate-900 rounded border border-cyan-400">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-1 bg-cyan-400 rounded opacity-20"
            />
          </div>
        </div>

        {/* Arms */}
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 -left-4 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full border border-cyan-400"
        />
        <motion.div
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-10 -right-4 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full border border-cyan-400"
        />

        {/* Legs */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-0 left-4 w-4 h-6 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full border border-cyan-400"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-4 w-4 h-6 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full border border-cyan-400"
        />

        {/* Energy Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 10px rgba(34, 211, 238, 0.5)",
              "0 0 20px rgba(34, 211, 238, 0.8)",
              "0 0 10px rgba(34, 211, 238, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
        />
      ))}

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl -z-10" />
    </motion.div>
  )
}

// Robot with Speech Bubble
export function RobotWithSpeech({ message = "Hello! I'm your AI assistant!" }) {
  return (
    <div className="relative">
      <AnimatedRobot />
      
      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg border border-cyan-400"
      >
        <p className="text-sm font-medium">{message}</p>
        
        {/* Speech bubble tail */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
      </motion.div>
    </div>
  )
}
