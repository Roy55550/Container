"use client";

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';
import { Home, BookOpen, Library, Settings, Youtube, Twitter, Globe, Plus, Check, Bookmark, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import {
  TooltipProvider,
} from "../components/ui/tooltip"
import { getInboxItems, moveItemToContentLibrary, InboxItem } from '../../src/lib/db';
import ShareButton from '../components/ShareButton';

const inboxItems: InboxItem[] = [
  // ... (keep the dummy data as provided in your example)
]

const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
  switch (source.toLowerCase()) {
    case 'youtube':
      return <Youtube className="h-4 w-4 text-red-500" />
    case 'twitter':
      return <Twitter className="h-4 w-4 text-blue-400" />
    default:
      return <Globe className="h-4 w-4 text-gray-500" />
  }
}

export default function InboxPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<InboxItem[]>(inboxItems)
  const [editingItem, setEditingItem] = useState<InboxItem | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<InboxItem>({
    id: '',
    source: '',
    header: '',
    summary: '',
    suggestedTags: [],
    category: '',
    note: '',
    link: '',
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        const inboxItems = await getInboxItems(user.uid);
        setItems(inboxItems);
      };
      fetchItems();
    }
  }, [user]);

  const handleMarkAsRead = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleKeepForLater = async (item: InboxItem) => {
    if (user) {
      await moveItemToContentLibrary(user.uid, item.id, item);
      setItems(items.filter(i => i.id !== item.id));
    }
  }

  const handleEditItem = (item: InboxItem) => {
    setEditingItem(item)
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? editingItem : item))
      setEditingItem(null)
    }
  }

  const handleCreateNewItem = () => {
    setIsCreateDialogOpen(true)
  }

  const handleSaveNewItem = () => {
    const itemWithId = { ...newItem, id: Date.now().toString() }
    setItems([itemWithId, ...items])
    setIsCreateDialogOpen(false)
    setNewItem({
      id: '',
      source: '',
      header: '',
      summary: '',
      suggestedTags: [],
      category: '',
      note: '',
      link: '',
    })
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        {/* Sidebar - hidden on mobile */}
        {!isMobile && (
          <nav className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-purple-800">Content Manager</h1>
            </div>
            <div className="space-y-2">
              <Link href="/home" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
              <Link href="/inbox" className="flex items-center p-2 rounded-lg text-purple-600 hover:bg-purple-100">
                <BookOpen className="h-5 w-5 mr-3" />
                <span>Inbox</span>
              </Link>
              <Link href="/content-library" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-purple-100">
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

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
            <div className={`mx-auto flex items-center justify-between ${isMobile ? 'max-w-3xl' : 'max-w-5xl'}`}>
              <h1 className="text-xl font-bold text-purple-800">Welcome, {user.email}</h1>
              <Button size="icon" variant="ghost" onClick={handleCreateNewItem}>
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4">
            <div className={`mx-auto space-y-4 ${isMobile ? 'max-w-3xl' : 'max-w-5xl'}`}>
              {items.map((item) => (
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
                    <div className="mb-2">
                      <strong className="text-gray-700">Summary:</strong>
                      <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                    </div>
                    <div className="mb-2">
                      <strong className="text-gray-700">Tags:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.suggestedTags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {item.note && (
                      <div className="mb-2">
                        <strong className="text-gray-700">Note:</strong>
                        <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                      </div>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-500 mt-2">
                        Added on: {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(item.id)} className="bg-purple-50 hover:bg-purple-100 text-purple-700">
                          <Check className="h-4 w-4" />
                          {!isMobile && <span className="ml-2">Mark as Read</span>}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleKeepForLater(item)} className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                          <Bookmark className="h-4 w-4" />
                          {!isMobile && <span className="ml-2">Keep for Later</span>}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditItem(item)} className="bg-green-50 hover:bg-green-100 text-green-700">
                          <Edit className="h-4 w-4" />
                          {!isMobile && <span className="ml-2">Edit</span>}
                        </Button>
                        <ShareButton 
                          title={item.header}
                          text={item.summary}
                          url={item.link}
                        />
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
                <Link href="/inbox" className="flex flex-col items-center text-purple-600">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xs mt-1">Inbox</span>
                </Link>
                <Link href="/content-library" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
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

        {/* Edit Dialog */}
        <Dialog open={editingItem !== null} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="header" className="text-right">Title</label>
                  <Input
                    id="header"
                    value={editingItem.header}
                    onChange={(e) => setEditingItem({...editingItem, header: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="summary" className="text-right">Summary</label>
                  <Textarea
                    id="summary"
                    value={editingItem.summary}
                    onChange={(e) => setEditingItem({...editingItem, summary: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="tags" className="text-right">Tags</label>
                  <Input
                    id="tags"
                    value={editingItem.suggestedTags.join(', ')}
                    onChange={(e) => setEditingItem({...editingItem, suggestedTags: e.target.value.split(', ')})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right">Category</label>
                  <Input
                    id="category"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="note" className="text-right">Note</label>
                  <Textarea
                    id="note"
                    value={editingItem.note}
                    onChange={(e) => setEditingItem({...editingItem, note: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleSaveEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create New Item Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-source" className="text-right">Source</label>
                <Input
                  id="new-source"
                  value={newItem.source}
                  onChange={(e) => setNewItem({...newItem, source: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-header" className="text-right">Title</label>
                <Input
                  id="new-header"
                  value={newItem.header}
                  onChange={(e) => setNewItem({...newItem, header: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-summary" className="text-right">Summary</label>
                <Textarea
                  id="new-summary"
                  value={newItem.summary}
                  onChange={(e) => setNewItem({...newItem, summary: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-tags" className="text-right">Tags</label>
                <Input
                  id="new-tags"
                  value={newItem.suggestedTags.join(', ')}
                  onChange={(e) => setNewItem({...newItem, suggestedTags: e.target.value.split(', ')})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-category" className="text-right">Category</label>
                <Input
                  id="new-category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-link" className="text-right">Link</label>
                <Input
                  id="new-link"
                  value={newItem.link}
                  onChange={(e) => setNewItem({...newItem, link: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveNewItem}>Create Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
