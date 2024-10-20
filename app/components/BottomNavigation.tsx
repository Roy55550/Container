import Link from 'next/link'
import { Home, Heart, Users, FileText } from 'lucide-react'

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav md:hidden">
      <ul className="flex justify-around py-2">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/getting-married" className="flex flex-col items-center">
            <Heart size={24} />
            <span className="text-xs">Marriage</span>
          </Link>
        </li>
        <li>
          <Link href="/journey-into-parenthood" className="flex flex-col items-center">
            <Users size={24} />
            <span className="text-xs">Parenthood</span>
          </Link>
        </li>
        <li>
          <Link href="/separation-divorce-main" className="flex flex-col items-center">
            <FileText size={24} />
            <span className="text-xs">Divorce</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default BottomNavigation
