import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Instagram, Linkedin, Star, ChevronRight, ArrowDown, Monitor, Code, Database, Cloud, Palette, FileCode, Globe, Server, Zap, Shield, Layers, Box, Package, GitBranch, GitCommit, GitPullRequest } from 'lucide-react'
import * as THREE from 'three'

// Import Spline with fallback
import Spline from '@splinetool/react-spline'

// Simple test component to verify React is working
function TestComponent() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg">
      ✅ React is working!
    </div>
  )
}

function ScrollingText() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { threshold: 0.3 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate animation speed based on whether we're in view
  const animationSpeed = isInView ? 0.1 : 1 // Slow down when in view
  const offset = scrollY * animationSpeed

  return (
    <div ref={containerRef} className="relative h-32 overflow-hidden">
      {/* First line - Moving right */}
      <motion.div
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          transform: `translateX(${-offset % (window.innerWidth + 500)}px)`,
        }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="text-8xl md:text-9xl font-black text-cyan-400/20 mx-8"
            style={{
              textShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            }}
          >
            
          </span>
        ))}
      </motion.div>

      {/* Second line - Moving left */}
      <motion.div
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          transform: `translateX(${(offset * 0.5) % (window.innerWidth + 500) - (window.innerWidth + 500)}px)`,
        }}
        animate={isInView ? { opacity: 0.2 } : { opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="text-6xl md:text-7xl font-black text-blue-500/10 mx-12"
          >
          
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function GridBackground() {
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

    const gridSize = 40
    let time = 0

    function drawBlueprintGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set dark background
      ctx.fillStyle = '#0a0a12'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      // Set crisp cyan grid color
      const gridColor = 'rgba(34, 211, 238, 0.3)'
      
      // Animated offset for subtle movement
      const offsetX = (time * 0.05) % gridSize
      const offsetY = (time * 0.03) % gridSize

      // Draw grid lines
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = -offsetX; x <= window.innerWidth + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, window.innerHeight)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = -offsetY; y <= window.innerHeight + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(window.innerWidth, y)
        ctx.stroke()
      }

      // Draw intersection dots
      ctx.fillStyle = 'rgba(34, 211, 238, 0.4)'
      for (let x = -offsetX; x <= window.innerWidth + gridSize; x += gridSize) {
        for (let y = -offsetY; y <= window.innerHeight + gridSize; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      time += 1
    }

    function animate() {
      drawBlueprintGrid()
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

function TypingText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="text-cyan-400">|</span>}
    </span>
  )
}





export default function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const [activeFilter, setActiveFilter] = useState('Web/Apps')
  const [splineLoaded, setSplineLoaded] = useState(false)

  return (
    <div className="min-h-screen text-white overflow-hidden" id="home">
      <TestComponent />
      <GridBackground />
      
      {/* Scrolling Text Background */}
      <div className="fixed inset-0 z-0">
        <ScrollingText />
      </div>
      
      {/* Header/Navigation */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left - Logo & Name */}
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg"
            >
              V
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold"
              >
                VON RAZEL MORALES
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-cyan-400 text-sm"
              >
                FULL-STACK DEVELOPER & DIGITAL INNOVATOR
              </motion.p>
            </div>
          </div>

          {/* Center - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#home" className="text-white hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-cyan-400 transition-colors">About</a>
          </motion.div>

          {/* Right - Navigation & Icon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-8"
          >
            <div className="hidden md:flex space-x-8">
              <a href="#project" className="text-white hover:text-cyan-400 transition-colors">Project</a>
              <a href="#contact" className="text-white hover:text-cyan-400 transition-colors">Contact</a>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-slate-900" />
            </motion.div>
          </motion.div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Innovation Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-transparent border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
            >
              <Star className="w-4 h-4" />
              <span>Digital Innovation & Excellence</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-5xl md:text-7xl font-black text-cyan-400"
                style={{
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)'
                }}
              >
                WELCOME TO MY PORTFOLIO
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-5xl md:text-7xl font-black text-cyan-400"
                style={{
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)'
                }}
              >
          
              </motion.h2>
            </div>

            {/* Sub Heading with Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-2xl md:text-3xl font-semibold text-cyan-400"
              style={{
                textShadow: '0 0 10px rgba(34, 211, 238, 0.6)'
              }}
            >
              <TypingText text="Front End Developer" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-slate-300 text-lg leading-relaxed max-w-lg"
            >
              Full-stack developer specializing in modern web applications and digital solutions. 
              Combining technical expertise with creative design to deliver exceptional user experiences 
              and scalable software solutions.
            </motion.p>

            {/* Skill Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3"
            >
              {['Full-Stack', 'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-slate-800 rounded-full text-white hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex space-x-4"
            >
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Spline 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-[32rem] lg:h-[36rem] xl:h-[40rem] rounded-2xl overflow-hidden shadow-2xl relative">
              <Spline
                scene="https://prod.spline.design/1ZSiX2kae05NjGHw/scene.splinecode"
                style={{ 
                  background: 'transparent',
                  width: '100%',
                  height: '100%'
                }}
                onLoad={() => setSplineLoaded(true)}
                onError={(error) => {
                  console.error('Spline loading error:', error)
                  setSplineLoaded(true)
                }}
              />
              
              {/* Add subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" 
                   style={{
                     background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                     filter: 'blur(20px)'
                   }} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* About Me Section */}
      <section id="about" className="py-24 relative z-10">
        {/* About Me Scrolling Marquee */}
        <div className="relative h-32 overflow-hidden mb-16">
          {/* First line - Moving right */}
          <motion.div
            className="absolute inset-0 flex items-center whitespace-nowrap"
            animate={{
              x: [0, -window.innerWidth * 2]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className="text-6xl md:text-8xl font-black text-cyan-400/30 mx-8"
                style={{
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)',
                }}
              >
                ABOUT ME
              </span>
            ))}
          </motion.div>

          {/* Second line - Moving left */}
          <motion.div
            className="absolute inset-0 flex items-center whitespace-nowrap"
            animate={{
              x: [-window.innerWidth * 2, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-black text-blue-500/20 mx-12"
                style={{
                  textShadow: '0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)',
                }}
              >
                ABOUT ME
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <p className="text-lg text-cyan-400 font-medium">
                  ◇ Full-Stack Developer & Digital Solutions Specialist ◇
                </p>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-2"
              >
                <h2 className="text-lg font-medium text-white/80 tracking-wider">
                  HELLO, I'M
                </h2>
                <h1 
                  className="text-5xl md:text-6xl font-black text-cyan-400"
                  style={{
                    textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)'
                  }}
                >
                  VON RAZEL MORALES
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-lg text-slate-300 leading-relaxed">
                  A passionate fourth-year Information Technology student with expertise in full-stack development, 
                  specializing in creating innovative web applications and digital solutions. My journey in tech 
                  combines academic excellence with hands-on project experience.
                </p>
                
                <p className="text-lg text-slate-300 leading-relaxed">
                  I excel in modern web development, crafting responsive user interfaces with React and TypeScript, 
                  while building robust backend systems using Node.js and Python. My technical foundation spans 
                  from front-end frameworks to database design and cloud deployment.
                </p>

                <p className="text-lg text-slate-300 leading-relaxed">
                  Beyond development, I bring creative vision as a freelance designer, creating compelling visual 
                  content and user experiences. My expertise in data visualization and database management enables 
                  me to deliver comprehensive solutions that bridge technical functionality with user-centered design.
                </p>

                <p className="text-lg text-slate-300 leading-relaxed">
                  Driven by continuous learning and collaborative problem-solving, I'm committed to delivering 
                  high-quality, scalable solutions that make a meaningful impact in the digital landscape.
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-start space-x-4"
              >
                <div className="w-1 h-16 bg-cyan-400 rounded-full mt-2" />
                <p className="text-lg italic text-slate-300">
                  "Whoever strives shall succeed."
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-800/80 border border-cyan-400/30 rounded-lg text-white hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>Download CV</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-800/80 border border-cyan-400/30 rounded-lg text-white hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                >
                  <Monitor className="w-4 h-4" />
                  <span>View Projects</span>
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex space-x-4"
              >
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-slate-800/80 border border-cyan-400/30 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Greeting Robot (Spline) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-[28rem] lg:h-[32rem] xl:h-[36rem] rounded-2xl overflow-hidden relative mx-auto"
              style={{ background: 'transparent' }}
            >
              <Spline
                scene="https://prod.spline.design/LdCp-NizJXelVO9r/scene.splinecode"
                style={{ 
                  background: 'transparent',
                  width: '100%',
                  height: '100%'
                }}
                onLoad={() => setSplineLoaded(true)}
                onError={(error) => {
                  console.error('Spline loading error:', error)
                  setSplineLoaded(true) // Set to true to hide loading state even on error
                }}
              />
              {/* Loading fallback */}
              {!splineLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20 rounded-xl">
                  <div className="text-cyan-400 text-lg">🤖 Loading Robot...</div>
                </div>
              )}
    
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="project" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "</>", title: "TOTAL PROJECTS", desc: "Innovative web solutions crafted", value: "13" },
              { icon: "⚙️", title: "CERTIFICATES", desc: "Professional skills validated", value: "13" },
              { icon: "🌐", title: "YEARS OF EXPERIENCE", desc: "Continuous learning journey", value: "3" }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-slate-800/50 border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white text-xl">
                    {stat.icon}
                  </div>
                  <div className="text-white text-sm">↗</div>
                </div>
                <h4 className="text-white font-bold text-sm uppercase mb-2">{stat.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{stat.desc}</p>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black">
              <span className="text-cyan-400" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}>PORTFOLIO</span>
              <span className="text-white"> SHOWCASE</span>
            </h2>
          </motion.div>

          {/* Navigation Tabs - Landscape Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-cyan-400/20 shadow-2xl flex">
              {[
                { id: 'projects', icon: '</>', label: 'Projects' },
                { id: 'certificates', icon: '🏆', label: 'Certificates' },
                { id: 'techstack', icon: '⚡', label: 'Tech Stack' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    activeTab === tab.id
                      ? 'bg-slate-900/80 text-white shadow-lg border border-cyan-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="font-semibold text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Filters - Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-1 border border-cyan-400/30 shadow-lg">
              {['Web/Apps', '3D Design'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 text-sm font-bold ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 shadow-md'
                      : 'text-white hover:text-cyan-400 hover:bg-slate-700/30'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeTab === 'projects' && (
              <>
                {[
                  {
                    title: "MountData - Mountain Exploration Platform",
                    desc: "A comprehensive mountain exploration and hiking platform featuring mountain profiles, interactive maps, community features, and educational content about sustainable hiking practices. Includes mountain search, blog posts, and responsible exploration guidelines.",
                    image: "mountain",
                    icons: ["🗺️", "🏔️", "🌿", "👥"],
                    link: "https://web-systems.tech/BA-WST/MountData/index.php",
                    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Interactive Maps"]
                  },
                  {
                    title: "Museo de Malaquing Tubig",
                    desc: "A comprehensive museum website showcasing local heritage and cultural exhibits. Built with MERN stack (MongoDB, Express.js, React, Node.js) featuring interactive exhibits, virtual tours, and educational content.",
                    image: "museum",
                    icons: ["M", "E", "R", "N"],
                    link: "https://museo-de-malaquing-tubig.vercel.app/",
                    tech: ["MongoDB", "Express.js", "React", "Node.js", "Vercel"]
                  },
                  {
                    title: "Services Platform",
                    desc: "A modern service marketplace platform connecting users with professional services. Features user authentication, service booking, real-time messaging, and payment integration.",
                    image: "services",
                    icons: ["M", "E", "R", "N"],
                    link: "https://services-rosy.vercel.app/",
                    tech: ["MongoDB", "Express.js", "React", "Node.js", "Vercel"]
                  }
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-slate-800/50 border border-cyan-400/20 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="h-36 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4 flex items-center justify-center">
                      <div className="text-cyan-400 text-4xl opacity-50">
                        {project.image === 'dashboard' ? '📊' : 
                         project.image === 'museum' ? '🏛️' : 
                         project.image === 'services' ? '🛠️' : 
                         project.image === 'mountain' ? '🏔️' : '💻'}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">{project.title}</h4>
                    <p className="text-slate-300 text-sm mb-4">{project.desc}</p>
                    
                    {/* Tech Stack */}
                    {project.tech && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full border border-cyan-400/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {project.icons.map((icon, i) => (
                          <span key={i} className="text-xs bg-slate-700 px-2 py-1 rounded text-white">{icon}</span>
                        ))}
                      </div>
                      {project.link ? (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-300"
                        >
                          ↗
                        </a>
                      ) : (
                        <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {activeTab === 'certificates' && (
              <>
                {[
                  {
                    issuer: "DICODING INDONESIA",
                    title: "Belajar Membuat Aplikasi Web dengan React",
                    validity: "Des 2024",
                    color: "blue"
                  },
                  {
                    issuer: "DICODING INDONESIA",
                    title: "Belajar Dasar Pemrograman JavaScript",
                    validity: "Des 2024",
                    color: "blue"
                  },
                  {
                    issuer: "BADAN NASIONAL SERTIFIKASI PROFESI (BNSP)",
                    title: "Junior Web Developer (BNSP)",
                    validity: "Sep 2024",
                    color: "green"
                  }
                ].map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-slate-800/50 border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{cert.issuer}</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{cert.validity}</span>
                    </div>
                    <div className="h-32 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-600/50 mb-4 flex items-center justify-center">
                      <div className="text-slate-400 text-2xl">📜</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3">{cert.title}</h4>
                    <button className="w-full bg-cyan-400 text-slate-900 py-2 rounded-lg font-medium hover:bg-cyan-300 transition-colors flex items-center justify-center space-x-2">
                      <span>📥</span>
                      <span>View Certificate</span>
                    </button>
                  </motion.div>
                ))}
              </>
            )}

            {activeTab === 'techstack' && (
              <>
                {[
                  {
                    category: "⚙️ Frameworks, Libraries & Tools",
                    subcategories: [
                      {
                        title: "Frontend",
                        skills: [
                          { name: "TypeScript", icon: "TS", color: "blue", component: Code },
                          { name: "JavaScript", icon: "JS", color: "yellow", component: Code },
                          { name: "HTML5", icon: "HTML5", color: "orange", component: FileCode },
                          { name: "CSS3", icon: "CSS3", color: "blue", component: Palette },
                          { name: "React", icon: "⚛️", color: "cyan", component: Layers },
                          { name: "Angular", icon: "🅰️", color: "red", component: Globe },
                          { name: "Tailwind CSS", icon: "🎨", color: "cyan", component: Palette },
                          { name: "Bootstrap", icon: "B", color: "purple", component: Box },
                          { name: "Vite", icon: "⚡", color: "yellow", component: Zap }
                        ]
                      },
                      {
                        title: "Backend",
                        skills: [
                          { name: "Node.js", icon: "Node", color: "green", component: Server },
                          { name: "Python", icon: "🐍", color: "blue", component: Code },
                          { name: "PHP", icon: "🐘", color: "purple", component: Code },
                          { name: "Java", icon: "☕", color: "red", component: Code },
                          { name: "C#", icon: "C#", color: "purple", component: Code },
                          { name: "VB.NET", icon: "VB", color: "blue", component: Code },
                          { name: "C++", icon: "C++", color: "blue", component: Code },
                          { name: "Express.js", icon: "🚂", color: "gray", component: Server },
                          { name: "Flask", icon: "🍶", color: "black", component: Package },
                          { name: "Spring Boot", icon: "🌱", color: "green", component: Server }
                        ]
                      }
                    ]
                  },
                  {
                    category: "☁️ Cloud Tools & Hosting",
                    skills: [
                      { name: "AWS", icon: "☁️", color: "orange", component: Cloud },
                      { name: "Cloudinary", icon: "☁️", color: "blue", component: Cloud },
                      { name: "Docker", icon: "🐳", color: "blue", component: Box },
                      { name: "Git", icon: "📝", color: "orange", component: GitBranch },
                      { name: "GitHub", icon: "🐙", color: "black", component: Github },
                      { name: "Hostinger", icon: "🏠", color: "blue", component: Server },
                      { name: "Render", icon: "🎨", color: "green", component: Palette },
                      { name: "Vercel", icon: "▲", color: "black", component: Zap },
                      { name: "Railway", icon: "🚂", color: "blue", component: Server },
                      { name: "Upstash", icon: "⚡", color: "green", component: Zap },
                      { name: "Supabase", icon: "🗄️", color: "green", component: Database }
                    ]
                  },
                  {
                    category: "🎨 Design & Development Tools",
                    skills: [
                      { name: "Figma", icon: "🎨", color: "purple", component: Palette },
                      { name: "VS Code", icon: "💻", color: "blue", component: FileCode },
                      { name: "Postman", icon: "📮", color: "orange", component: Globe },
                      { name: "Canva", icon: "🎭", color: "blue", component: Palette },
                      { name: "Power BI", icon: "📊", color: "yellow", component: Database },
                      { name: "Photoshop (PS)", icon: "🖼️", color: "blue", component: Palette },
                      { name: "CapCut", icon: "✂️", color: "black", component: Package },
                      { name: "Spline", icon: "🎯", color: "purple", component: Layers }
                    ]
                  }
                ].map((tech, index) => (
                  <motion.div
                    key={tech.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 group"
                  >
                    {/* Enhanced Header */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-cyan-400 mb-2 flex items-center">
                        <span className="mr-3 text-2xl">{tech.category.split(' ')[0]}</span>
                        <span className="text-lg">{tech.category.split(' ').slice(1).join(' ')}</span>
                      </h4>
                      <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    </div>
                    
                    {tech.subcategories ? (
                      <div className="space-y-8">
                        {tech.subcategories.map((sub, _subIndex) => (
                          <div key={sub.title}>
                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                              {sub.title}
                            </h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {sub.skills.map((skill, _skillIndex) => (
                                <motion.div 
                                  key={skill.name} 
                                  className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 hover:from-slate-600/50 hover:to-slate-700/50 transition-all duration-300 group border border-slate-600/30 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/20"
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-lg font-bold mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    {skill.component ? (
                                      <skill.component className="w-6 h-6" />
                                    ) : (
                                      <span>{skill.icon}</span>
                                    )}
                                  </div>
                                  <span className="text-sm text-white text-center font-medium group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {tech.skills.map((skill, _skillIndex) => (
                          <motion.div 
                            key={skill.name} 
                            className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 hover:from-slate-600/50 hover:to-slate-700/50 transition-all duration-300 group border border-slate-600/30 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/20"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-lg font-bold mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                              {skill.icon}
                            </div>
                            <span className="text-sm text-white text-center font-medium group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-3xl font-bold text-cyan-400 mb-8"
          >
            Contact
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-slate-300">Want to collaborate or just say hi? Drop a message and I'll get back to you.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-400 hover:text-slate-900 transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-400 hover:text-slate-900 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-400 hover:text-slate-900 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <form className="space-y-4">
              <input 
                className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-cyan-400/20 focus:border-cyan-400 outline-none" 
                placeholder="Your name" 
              />
              <input 
                className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-cyan-400/20 focus:border-cyan-400 outline-none" 
                placeholder="Your email" 
              />
              <textarea 
                rows="4" 
                className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-cyan-400/20 focus:border-cyan-400 outline-none" 
                placeholder="Your message" 
              />
              <button 
                type="button" 
                className="px-6 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:brightness-110"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

