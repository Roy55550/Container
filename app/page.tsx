"use client";

import { useState, useEffect } from 'react'
import { Search, Home, BookOpen, Library, Settings, ExternalLink, Edit, Check, Plus, Youtube, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Badge } from "./components/ui/badge"
import { Card, CardContent } from "./components/ui/card"
import { ScrollArea } from "./components/ui/scroll-area"

// Update the ContentItem interface to match the structure of InboxItem
interface ContentItem {
  id: string;
  source: string;
  header: string;
  summary: string;
  suggestedTags: string[];
  category: string;
  note: string;
  link: string;
  date?: string; // Make this optional as it might not be present in all items
  isRead?: boolean; // Make this optional as it might not be present in all items
}

const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
  switch (source.toLowerCase()) {
    case 'youtube':
      return <Youtube className="h-5 w-5 text-red-500" />
    case 'twitter':
      return <Twitter className="h-5 w-5 text-blue-400" />
    default:
      return <ExternalLink className="h-5 w-5 text-gray-500" />
  }
}

export default function ContentLibrary() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('contentLibraryItems') || '[]')
    setItems(storedItems)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))]

  const filteredItems = items.filter(item => 
    (activeCategory === 'all' || item.category === activeCategory) &&
    (item.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleMarkAsRead = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isRead: !item.isRead } : item
    ))
    // Update localStorage
    localStorage.setItem('contentLibraryItems', JSON.stringify(items))
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Sidebar - hidden on mobile */}
      {!isMobile && (
        <nav className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-800">bobo</h1>
          </div>
          <div className="space-y-2">
            <Link href="/home" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </Link>
            <Link href="/inbox" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
              <BookOpen className="h-5 w-5 mr-3" />
              <span>Inbox</span>
            </Link>
            <Link href="/content-library" className="flex items-center p-2 rounded-lg text-purple-600 hover:bg-purple-100">
              <Library className="h-5 w-5 mr-3" />
              <span>Content Library</span>
            </Link>
            <Link href="/settings" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className={`mx-auto flex flex-col gap-4 ${isMobile ? 'max-w-3xl' : 'max-w-5xl'}`}>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-purple-800">Content Library</h1>
              <Button size="icon" variant="ghost">
                <Plus className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <ScrollArea className="whitespace-nowrap">
              <div className="flex space-x-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      activeCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className={`mx-auto space-y-4 ${isMobile ? 'max-w-3xl' : 'max-w-5xl'}`}>
            {filteredItems.map(item => (
              <Card key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{item.category}</Badge>
                    <div className="flex items-center space-x-2">
                      <SourceIcon source={item.source} />
                      <span className="text-sm text-gray-500">{item.source}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.header}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(item.id)} className="bg-purple-50 hover:bg-purple-100 text-purple-700">
                        <Check className={`h-4 w-4 ${item.isRead ? 'text-green-500' : 'text-gray-500'}`} />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Bottom Navigation - only on mobile */}
        {isMobile && (
          <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
            <div className="max-w-3xl mx-auto px-4 py-2 flex justify-around">
              <Link href="/home" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
                <Home className="h-6 w-6" />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link href="/inbox" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
                <BookOpen className="h-6 w-6" />
                <span className="text-xs mt-1">Inbox</span>
              </Link>
              <Link href="/content-library" className="flex flex-col items-center text-purple-600">
                <Library className="h-6 w-6" />
                <span className="text-xs mt-1">Library</span>
              </Link>
              <Link href="/settings" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
                <Settings className="h-6 w-6" />
                <span className="text-xs mt-1">Settings</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}
