import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from '@/components/ui/button'
import { Rocket } from 'lucide-react'

export default function RootLayout() {
  const location = useLocation()
  const isIntro = location.pathname === '/' || location.pathname === '/intro'
  const isHome = location.pathname === '/home'
  const hideNav = isIntro || isHome
  
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && (
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link to="/" className="font-semibold flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Dream
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/intro" className="text-sm">Intro</Link>
            <Link to="/portfolio" className="text-sm">Portfolio</Link>
            <Button className="ml-2">Contact</Button>
          </div>
        </div>
      </nav>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

