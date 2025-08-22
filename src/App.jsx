import { Link } from 'react-router-dom'

function App() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
      <p className="mt-4 text-gray-500">Start building your portfolio with React + Tailwind.</p>
      <div className="mt-8 flex gap-4">
        <Link to="/portfolio" className="px-4 py-2 rounded bg-black text-white text-sm">View Portfolio</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded border text-sm">Go to Dashboard</Link>
      </div>
    </section>
  )
}

export default App
