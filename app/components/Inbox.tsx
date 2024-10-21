"use client";

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../src/context/AuthContext';
import LogoutButton from './LogoutButton';
import { Home, BookOpen, Library, Settings, Youtube, Twitter, Globe, Plus, Check, Bookmark, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"
import {
  TooltipProvider,
} from "./ui/tooltip"
import { getInboxItems, moveItemToContentLibrary } from '../../src/lib/db';

// ... rest of the Inbox component code ...
