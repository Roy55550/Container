import React, { useEffect, useState } from 'react'
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import LogoutButton from './components/LogoutButton';
import { Home, BookOpen, Library, Settings, Youtube, Twitter, Globe, Plus, Check, Bookmark, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent } from "./components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./components/ui/dialog"
import {
  TooltipProvider,
} from "./components/ui/tooltip"
import { getInboxItems, moveItemToContentLibrary } from '../src/lib/db';

// ... (rest of the file remains the same)
