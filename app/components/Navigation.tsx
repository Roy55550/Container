import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-3xl font-bold text-[#0F5C5B]">
          Family Edition
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link href="/" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Home</Link></li>
          <li><Link href="/getting-married" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Getting Married</Link></li>
          <li><Link href="/journey-into-parenthood" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Journey into Parenthood</Link></li>
          <li><Link href="/separation-divorce-main" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Separation & Divorce</Link></li>
          <li><Link href="#" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">About</Link></li>
          <li><Link href="#" className="text-gray-600 hover:text-[#0F5C5B] transition-colors">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
