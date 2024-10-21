"use client";

import React, { useState, useEffect } from 'react'
import { Search, ExternalLink, Edit, Check, Youtube, Twitter, BookOpen, Settings, Library, Home, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import LogoutButton from './LogoutButton'
import { getContentLibraryItems, InboxItem } from '../../src/lib/db';
import { useAuth } from '../../src/context/AuthContext';

const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
  switch (source.toLowerCase()) {
    case 'youtube':
      return <Youtube className="h-5 w-5 text-red-500" />
    case 'twitter':
      return <Twitter className="h-5 w-5 text-blue-400" />
    default:
      return <Globe className="h-5 w-5 text-gray-500" />
  }
}

export default function ContentLibrary() {
  const [items, setItems] = useState<InboxItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        const contentLibraryItems = await getContentLibraryItems(user.uid);
        setItems(contentLibraryItems);
      }
    };
    fetchItems();
  }, [user]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const categories = ['all', ...new Set(items.map(item => item.category))]

  const filteredItems = items.filter(item => 
    (activeCategory === 'all' || item.category === activeCategory) &&
    (item.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const groupedItems: Record<string, InboxItem[]> = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, InboxItem[]>)

  const handleMarkAsRead = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isRead: !item.isRead } : item
    ))
    // Update localStorage
    localStorage.setItem('contentLibraryItems', JSON.stringify(items))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile */}
      {!isMobile && (
        <nav className="w-64 bg-white shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Content Manager</h1>
          </div>
          <div className="space-y-2">
            <Link href="/home" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
              <BookOpen className="h-5 w-5 mr-3" />
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
            <LogoutButton />
          </div>
        </nav>
      )}

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Content Library</h1>
            <Input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              categoryItems.map(item => (
                <Card key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-sm font-medium">
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <SourceIcon source={item.source} />
                        <span className="text-sm text-gray-500">{item.source}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{item.header}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.suggestedTags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Original
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(item.id)}>
                          <Check className={`h-4 w-4 ${item.isRead ? 'text-green-500' : 'text-gray-500'}`} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ))}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - only on mobile */}
      {isMobile && (
        <nav className="bg-white shadow-lg fixed bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around">
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
  )
}
